import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ensureUploadDirectories } from './utils/ensure-upload-dirs';

function parseCsvEnv(name: string): string[] {
  return (process.env[name] ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function bootstrap() {
  // Ensure upload directories exist before starting the app
  ensureUploadDirectories();

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // If you're behind a proxy/load balancer (typical in managed hosting), enable this
  app.set('trust proxy', 1);

  // CORS origins:
  // - In production, set CORS_ORIGINS in Hostinger (comma-separated)
  // - If not set, we fall back to these values for local/test
  const fallbackOrigins = [
    'https://admin.nomw.test.rqm.sa',
    'https://nomw.test.rqm.sa'
  ];

  const envOrigins = parseCsvEnv('CORS_ORIGINS');
  const allowedOrigins = envOrigins.length ? envOrigins : fallbackOrigins;

  // Static uploads: Express static bypasses Nest CORS, so we handle it explicitly here.
  // This middleware makes /uploads production-safe (no wildcard with credentials).
  app.use('/uploads', (req, res, next) => {
    const origin = req.headers.origin as string | undefined;

    // Always vary on Origin so caches/CDNs don't mix responses across origins
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept-Language');

    if (origin && allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      // Only set this if you actually need cookies/authorization for uploads requests
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    if (req.method === 'OPTIONS') return res.status(204).end();
    next();
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  // Main API CORS (production-safe, env-driven)
  app.enableCors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no Origin header): health checks, curl, server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Language'],
    credentials: true,
    maxAge: 3600,
  });

  // Set global prefix
  app.setGlobalPrefix('api');

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const port = Number(process.env.PORT ?? 3000);
  await app.listen(port, '0.0.0.0');

  process.on('SIGTERM', async () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    await app.close();
    process.exit(0);
  });
}
if (require.main === module) {
  // Allow requiring bootstrap without auto-start (e.g., from server.js bridge)
  bootstrap();
}
