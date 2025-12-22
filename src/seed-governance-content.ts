import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { GovernanceContent } from './database/schemas/cms/governance-content.schema';
import { seedGovernanceContent } from './database/seeders/seed-governance-content';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const governanceContentModel = app.get(getModelToken(GovernanceContent.name));

    console.log('🌱 Starting governance content seeding...');

    const forceReseed = process.argv.includes('--force');
    if (forceReseed) {
        console.log('⚠️  Force reseed mode enabled');
    }

    await seedGovernanceContent(governanceContentModel, forceReseed);
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
