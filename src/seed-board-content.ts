import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { BoardContent } from './database/schemas/cms/board-content.schema';
import { seedBoardContent } from './database/seeders/seed-board-content';

async function seed() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const boardContentModel = app.get(getModelToken(BoardContent.name));

    console.log('🌱 Starting board content seeding...');

    const forceReseed = process.argv.includes('--force');
    if (forceReseed) {
        console.log('⚠️  Force reseed mode enabled');
    }

    await seedBoardContent(boardContentModel, forceReseed);
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
