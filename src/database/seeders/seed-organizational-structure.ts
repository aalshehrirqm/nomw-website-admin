import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { OrganizationalStructure } from '../schemas/cms/organizational-structure.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const structureModel = app.get<Model<OrganizationalStructure>>(
    getModelToken(OrganizationalStructure.name),
  );

  console.log('🌱 Seeding Organizational Structure...');

  // Clear existing data
  await structureModel.deleteMany({});
  console.log('✅ Cleared existing structure');

  // Create organizational structure entry
  const structureData = {
    title: {
      ar: 'الهيكل التنظيمي',
      en: 'Organizational Structure',
    },
    subtitle: {
      ar: 'يعكس الهيكل التنظيمي لشركة النمو المالية التزامنا بالشفافية والحوكمة الرشيدة، حيث يوضح التسلسل الإداري والمسؤوليات المحددة لكل قسم.',
      en: "Nomw Capital's organizational structure reflects our commitment to transparency and good governance, clearly outlining the administrative hierarchy and specific responsibilities of each department.",
    },
    image_ar: '/uploads/org-structure-ar.png',
    image_en: '/uploads/org-structure-en.png',
    isActive: true,
  };

  const result = await structureModel.create(structureData);
  console.log(`✅ Created organizational structure`);

  await app.close();
  console.log('🎉 Organizational Structure seeding completed!');
  console.log(
    '\n📝 Note: Please upload the actual images through the Admin Panel:',
  );
  console.log('   - Arabic image: org-structure-ar.png');
  console.log('   - English image: org-structure-en.png');
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
