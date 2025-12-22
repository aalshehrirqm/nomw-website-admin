import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LegalConsultationSection } from 'src/database/schemas/cms/legal-consultation-section.schema';
import { UpdateLegalConsultationSectionDto } from './dto/update-legal-consultation-section.dto';

@Injectable()
export class LegalConsultationSectionService {
  constructor(
    @InjectModel(LegalConsultationSection.name)
    private sectionModel: Model<LegalConsultationSection>,
  ) {}

  async getOrCreate(): Promise<LegalConsultationSection> {
    let section = await this.sectionModel.findOne().exec();

    if (!section) {
      section = new this.sectionModel({
        heroTitle: { ar: 'الاستشارات الشرعية', en: 'Sharia Consultancy' },
        heroDescription: {
          ar: 'في النمو المالية، نلتزم التزامًا كاملاً بأن تكون جميع أنشطتنا واستثماراتنا متوافقة مع أحكام ومبادئ الشريعة الإسلامية.',
          en: 'At Nomw Capital, we are fully committed to ensuring that all our activities and investments are in complete alignment with the principles and provisions of Islamic Sharia.',
        },
        heroSubtitle: {
          ar: 'وانطلاقًا من هذا الالتزام، ووفقًا لأفضل ممارسات الحوكمة الشرعية، قمنا بتعيين شركة دار المراجعة الشرعية كمستشار شرعي مستقل، بهدف دعمنا في تحقيق أعلى مستويات الامتثال للضوابط الشرعية',
          en: 'In line with leading Sharia governance practices, we have appointed the Shariyah Review Bureau as an independent Sharia advisor. Their role is instrumental in helping us maintain the highest standards of Sharia compliance across our operations.',
        },
        buttonText: { ar: 'تعرف على خدماتنا', en: 'Learn More' },
        listTitle: {
          ar: 'تتولى اللجنة الشرعية المهام التالية',
          en: 'Key Responsibilities of the Shariyah Review Bureau',
        },
        isActive: true,
      });
      await section.save();
    }

    return section;
  }

  async update(
    id: string,
    updateDto: UpdateLegalConsultationSectionDto,
  ): Promise<LegalConsultationSection> {
    return this.sectionModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec() as Promise<LegalConsultationSection>;
  }

  async toggleActive(): Promise<LegalConsultationSection> {
    const section = await this.getOrCreate();
    section.isActive = !section.isActive;
    return section.save();
  }
}
