import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { InvestorsRightsSection } from '../schemas/cms/investors-rights-section.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const sectionModel = app.get<Model<InvestorsRightsSection>>(
    getModelToken(InvestorsRightsSection.name),
  );

  console.log('🌱 Seeding Investors Rights Section...');

  await sectionModel.deleteMany({});
  console.log('✅ Cleared existing section');

  const sectionData = {
    title: {
      ar: 'حقوق المستثمرين',
      en: "Investors' Rights",
    },
    subtitle: {
      ar: 'تلتزم شركة النمو المالية بدعم وحماية حقوق المستثمرين بما يتوافق بشكل كامل مع القواعد والأنظمة والتوجيهات الصادرة عن هيئة السوق المالية في المملكة العربية السعودية. وتماشياً مع هذا الالتزام، تسعى شركة النمو المالية إلى تعزيز وعي المستثمرين وضمان أعلى معايير الشفافية والتواصل من خلال:',
      en: 'Nomw Capital is committed to upholding and protecting investor rights in full compliance with the rules, regulations, and directives issued by the Capital Market Authority of Saudi Arabia. In line with this commitment, Nomw Capital strives to enhance investor awareness and ensure the highest standards of transparency and communication by:',
    },
    ctaTitle: {
      ar: 'لديك أسئلة أكثر حول حقوق المستثمرين؟',
      en: 'Have more questions about investor rights?',
    },
    ctaButton: {
      ar: 'تواصل معنا',
      en: 'Contact Us',
    },
    isActive: true,
  };

  await sectionModel.create(sectionData);
  console.log('✅ Created section content');

  await app.close();
  console.log('🎉 Investors Rights Section seeding completed!');
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
