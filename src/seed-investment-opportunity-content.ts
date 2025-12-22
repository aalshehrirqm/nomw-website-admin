import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { InvestmentOpportunityContent } from './database/schemas/cms/investment-opportunity-content.schema';
import { seedInvestmentOpportunityContent } from './database/seeders/seed-investment-opportunity-content';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const investmentOpportunityContentModel = app.get(
        getModelToken(InvestmentOpportunityContent.name),
    );

    console.log('🌱 Starting investment opportunity content seeding...');

    // Check for --force flag
    const forceReseed = process.argv.includes('--force');
    if (forceReseed) {
        console.log('⚠️  Force reseed mode enabled');
    }

    await seedInvestmentOpportunityContent(investmentOpportunityContentModel, forceReseed);
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
