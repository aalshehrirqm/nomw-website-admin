import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BoardCommittee } from '../schemas/cms/board-committee.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const boardCommitteeModel = app.get<Model<BoardCommittee>>(
    getModelToken(BoardCommittee.name),
  );

  console.log('🌱 Seeding Board Committees...');

  // Clear existing data
  await boardCommitteeModel.deleteMany({});
  console.log('✅ Cleared existing board committees');

  // Seed data from existing translation file
  const committees = [
    {
      name: {
        ar: 'لجنة المراجعة',
        en: 'Audit Committee',
      },
      description: {
        ar: 'تُعد اللجنة جهة رقابة مستقلة تشرف على إعداد التقارير المالية، وتقييم نظم الرقابة الداخلية، وضمان الالتزام بالمعايير الأخلاقية المؤسسية. كما تعمل كحلقة وصل بين المراجع الخارجي والإدارات التنفيذية، مما يعزز مصداقية التقارير المالية وحوكمة الشركة.',
        en: 'The Committee serves as an independent oversight body that monitors the preparation of financial reports, evaluates internal control systems, and ensures compliance with institutional ethical standards. It also acts as a liaison between external auditors and executive management, enhancing the credibility of financial reporting and corporate governance.',
      },
      responsibilities: {
        ar: 'الإشراف على التقارير المالية وتقييم نظم الرقابة الداخلية',
        en: 'Oversight of financial reports and evaluation of internal control systems',
      },
      icon: 'document-text',
      order: 0,
      isActive: true,
    },
    {
      name: {
        ar: 'لجنة الترشيحات والمكافآت',
        en: 'Nominations and Remuneration Committee',
      },
      description: {
        ar: 'تتولى اللجنة إعداد سياسة واضحة لمكافآت أعضاء مجلس الإدارة، والرئيس التنفيذي، وكبار التنفيذيين، إلى جانب وضع سياسات الحوافز والمكافآت بما يتماشى مع ثقافة الشركة وقيمها وأهدافها، ويُرسخ مبادئ العدالة والشفافية في التقييم والتحفيز.',
        en: 'The Committee is responsible for preparing a clear policy for the remuneration of board members, the CEO, and senior executives, as well as establishing incentive and reward policies in line with the company culture, values, and objectives, reinforcing principles of fairness and transparency in evaluation and motivation.',
      },
      responsibilities: {
        ar: 'إعداد سياسات المكافآت والحوافز للإدارة التنفيذية وأعضاء مجلس الإدارة',
        en: 'Preparing remuneration and incentive policies for executive management and board members',
      },
      icon: 'users',
      order: 1,
      isActive: true,
    },
    {
      name: {
        ar: 'لجنة الالتزام والمخاطر',
        en: 'Compliance and Risk Committee',
      },
      description: {
        ar: 'تُعنى اللجنة بمتابعة التزام الشركة بكافة الأنظمة واللوائح المحلية والدولية، وتشرف على برامج مكافحة غسل الأموال وتمويل الإرهاب. كما تتولى متابعة تنفيذ برامج التدريب المستمر لموظفي الشركة في مجالات الامتثال وإدارة المخاطر.',
        en: 'The Committee monitors the company compliance with all local and international regulations and oversees anti-money laundering and counter-terrorism financing programs. It also follows up on the implementation of continuous training programs for company employees in compliance and risk management areas.',
      },
      responsibilities: {
        ar: 'متابعة الالتزام التنظيمي وإدارة المخاطر ومكافحة غسل الأموال',
        en: 'Monitoring regulatory compliance, risk management, and anti-money laundering',
      },
      icon: 'shield-check',
      order: 2,
      isActive: true,
    },
    {
      name: {
        ar: 'لجنة الاستثمار',
        en: 'Investment Committee',
      },
      description: {
        ar: 'تسهم اللجنة في التوسع الاستراتيجي للشركة من خلال مراجعة الفرص الاستثمارية، وتوجيه قرارات الاستحواذ وتوزيع رأس المال، بما يضمن الالتزام بسياسات الاستثمار المتوافقة مع الشريعة الإسلامية، ويعزز تحقيق نمو مستدام وعوائد تنافسية للمستثمرين.',
        en: 'The Committee contributes to the company strategic expansion by reviewing investment opportunities and guiding acquisition decisions and capital allocation, ensuring compliance with Sharia-compliant investment policies and promoting sustainable growth and competitive returns for investors.',
      },
      responsibilities: {
        ar: 'مراجعة الفرص الاستثمارية وتوجيه قرارات الاستحواذ وتوزيع رأس المال',
        en: 'Reviewing investment opportunities and guiding acquisition decisions and capital allocation',
      },
      icon: 'trending-up',
      order: 3,
      isActive: true,
    },
  ];

  // Insert seed data
  const result = await boardCommitteeModel.insertMany(committees);
  console.log(`✅ Inserted ${result.length} board committees`);

  await app.close();
  console.log('🎉 Seeding completed!');
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
