import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Model } from 'mongoose';
import { Service } from '../schemas/cms/service.schema';
import { getModelToken } from '@nestjs/mongoose';
import { servicesData } from './services-full.seeder';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const serviceModel = app.get<Model<Service>>(getModelToken(Service.name));

  try {
    // Clear existing services
    await serviceModel.deleteMany({});
    console.log('✅ Cleared existing services');

    // Insert new services
    await serviceModel.insertMany(servicesData);
    console.log('✅ Successfully seeded services data');
    console.log(`📊 Total services: ${servicesData.length}`);
  } catch (error) {
    console.error('❌ Error seeding services:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
