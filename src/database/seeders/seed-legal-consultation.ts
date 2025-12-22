import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { LegalConsultationService } from '../../modules/legal/legal-consultation/legal-consultation.service';
import { LegalConsultationSectionService } from '../../modules/legal/legal-consultation/legal-consultation-section.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const service = app.get(LegalConsultationService);
  const sectionService = app.get(LegalConsultationSectionService);

  // Initial Data
  const items = [
    {
      title: {
        ar: 'إنشاء إطار حوكمة شرعية متكاملة.',
        en: 'Establishing a comprehensive Sharia governance framework across the firm.',
      },
      icon: 'document-text',
      order: 0,
      isActive: true,
    },
    {
      title: {
        ar: 'مراجعة واعتماد جميع المنتجات والخدمات الاستثمارية الشرعية.',
        en: 'Reviewing and approving all Sharia-compliant products and services.',
      },
      icon: 'shield-check',
      order: 1,
      isActive: true,
    },
    {
      title: {
        ar: 'الإشراف على عمليات التدقيق الشرعي لضمان الالتزام التام.',
        en: 'Supervising periodic Sharia audits to ensure full adherence to Sharia guidelines.',
      },
      icon: 'list-check',
      order: 2,
      isActive: true,
    },
    {
      title: {
        ar: 'التنسيق مع مختلف الإدارات والأقسام لضمان تكامل الجوانب الشرعية في جميع العمليات.',
        en: 'Coordinating with internal departments to integrate Sharia considerations into operations.',
      },
      icon: 'chart-bar',
      order: 3,
      isActive: true,
    },
    {
      title: {
        ar: 'تطوير المنتجات الاستثمارية بما يتوافق مع الضوابط والمعايير الشرعية.',
        en: 'Supporting the development of new products that conform to Sharia requirements.',
      },
      icon: 'refresh',
      order: 4,
      isActive: true
    },
    {
      title: { ar: 'فحص الامتثال', en: 'Compliance Check' },
      icon: 'shield-check',
      order: 5,
      isActive: true
    }
  ];

  try {
    const existing = await service.findAll();
    console.log('Clearing existing legal consultation items...');
    // Optional: clear existing if you want to force refresh, using a delete logic here or just iterating
    // For safe update: iterate and update if exists or delete all. 
    // Let's delete all for this seed run to ensure clean state with correct icons.
    for (const item of existing) {
      await service.remove(item._id as string);
    }

    console.log('Seeding items...');
    for (const item of items) {
      await service.create(item);
    }
    console.log(`Seeded ${items.length} items successfully.`);

    console.log('Ensuring Section Content...');
    await sectionService.getOrCreate();
    console.log('Section content ensured.');
  } catch (error) {
    console.error('Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
