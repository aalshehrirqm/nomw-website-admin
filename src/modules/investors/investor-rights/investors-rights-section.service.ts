import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorsRightsSection } from '../../../database/schemas/cms/investors-rights-section.schema';
import { CreateInvestorsRightsSectionDto } from './dto/create-investors-rights-section.dto';
import { UpdateInvestorsRightsSectionDto } from './dto/update-investors-rights-section.dto';

@Injectable()
export class InvestorsRightsSectionService {
  constructor(
    @InjectModel(InvestorsRightsSection.name)
    private sectionModel: Model<InvestorsRightsSection>,
  ) {}

  async getOrCreate(): Promise<InvestorsRightsSection> {
    let section = await this.sectionModel.findOne().exec();

    if (!section) {
      section = new this.sectionModel({
        title: {
          ar: 'حقوق المستثمرين',
          en: "Investors' Rights",
        },
        subtitle: {
          ar: 'تلتزم شركة النمو المالية بدعم وحماية حقوق المستثمرين',
          en: 'Nomw Capital is committed to upholding and protecting investor rights',
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
      });
      await section.save();
    }

    return section;
  }

  async update(
    id: string,
    updateDto: UpdateInvestorsRightsSectionDto,
  ): Promise<InvestorsRightsSection> {
    const section = await this.sectionModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    return section;
  }

  async toggleActive(id: string): Promise<InvestorsRightsSection> {
    const section = await this.sectionModel.findById(id).exec();
    if (!section) {
      throw new NotFoundException(`Section with ID ${id} not found`);
    }
    section.isActive = !section.isActive;
    return section.save();
  }
}
