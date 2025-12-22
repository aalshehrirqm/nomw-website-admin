import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { PeriodicReport } from './database/schemas/cms/periodic-report.schema';
import { seedPeriodicReports } from './database/seeders/seed-periodic-reports';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const periodicReportModel = app.get(getModelToken(PeriodicReport.name));

    console.log('🌱 Starting periodic reports seeding...');
    await seedPeriodicReports(periodicReportModel);
    console.log('✅ Seeding completed!');

    await app.close();
}

seed()
    .then(() => {
        console.log('🎉 Script finished successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Error during seeding:', error);
        process.exit(1);
    });
