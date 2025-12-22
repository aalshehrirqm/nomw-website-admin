import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { InvestorRight } from '../schemas/cms/investor-right.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const rightModel = app.get<Model<InvestorRight>>(
    getModelToken(InvestorRight.name),
  );

  console.log('🌱 Seeding Investor Rights...');

  await rightModel.deleteMany({});
  console.log('✅ Cleared existing rights');

  const rights = [
    {
      name: {
        ar: 'توفير المعلومات في الوقت المناسب وبدقة',
        en: 'Providing Timely and Accurate Information',
      },
      description: {
        ar: 'تقديم جميع البيانات والإفصاحات المطلوبة وفقاً للقوانين واللوائح المعمول بها',
        en: 'Delivering all required data and disclosures in accordance with applicable laws and regulations',
      },
      icon: '/icons/document-text.svg',
      order: 0,
      isActive: true,
    },
    {
      name: {
        ar: 'توضيح شروط وأحكام الاستثمار',
        en: 'Clarifying Investment Terms and Conditions',
      },
      description: {
        ar: 'عرض شروط الاستثمار بطريقة واضحة ومفصلة، مع الالتزام بإخطار المستثمرين بأي تغييرات جوهرية',
        en: 'Presenting investment terms in a clear and detailed manner, with a commitment to notify investors of any material changes',
      },
      icon: '/icons/shield-check.svg',
      order: 1,
      isActive: true,
    },
    {
      name: {
        ar: 'إصدار التقارير الدورية',
        en: 'Issuing Periodic Reports',
      },
      description: {
        ar: 'تقديم تحديثات منتظمة حول أداء الاستثمار والقوائم المالية والتقارير الأخرى ذات الصلة - بشكل دوري وعند الطلب - لتمكين المستثمرين من مراقبة محافظهم واتخاذ قرارات مستنيرة',
        en: 'Supplying regular updates on investment performance, financial statements, and other relevant reports—both periodically and upon request—to empower investors to monitor their portfolios and make well-informed decisions',
      },
      icon: '/icons/chart-line.svg',
      order: 2,
      isActive: true,
    },
  ];

  for (const right of rights) {
    await rightModel.create(right);
  }

  console.log(`✅ Created ${rights.length} investor rights`);
  await app.close();
  console.log('🎉 Investor Rights seeding completed!');
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
