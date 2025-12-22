import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BoardCommitteesSection } from '../schemas/cms/board-committees-section.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sectionModel = app.get<Model<BoardCommitteesSection>>(
    getModelToken(BoardCommitteesSection.name),
  );

  console.log('🌱 Seeding Board Committees Section...');

  // Clear existing data
  await sectionModel.deleteMany({});
  console.log('✅ Cleared existing section content');

  // Create section content
  const sectionData = {
    title: {
      ar: 'لجان مجلس الإدارة',
      en: 'Board Committees',
    },
    subtitle: {
      ar: 'تُعد اللجان المنبثقة عن مجلس الإدارة جزءاً جوهرياً من منظومة الحوكمة في النمو المالية، حيث تضطلع بأدوار تكاملية في دعم الإدارة التنفيذية، والإشراف على الجوانب التنظيمية والرقابية لضمان الكفاءة، والشفافية، والامتثال المستمر.',
      en: 'Board committees are an integral part of the governance system at Nomw Capital, as they play complementary roles in supporting executive management and supervising regulatory and oversight aspects to ensure efficiency, transparency, and continuous compliance.',
    },
    isActive: true,
  };

  const result = await sectionModel.create(sectionData);
  console.log(`✅ Created section content`);

  await app.close();
  console.log('🎉 Section seeding completed!');
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('❌ Section seeding failed:', err);
  process.exit(1);
});
