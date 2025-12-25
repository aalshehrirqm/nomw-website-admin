// Express-friendly bridge to start the compiled Nest app for Hostinger.
const { bootstrap } = require('./dist/main');

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
