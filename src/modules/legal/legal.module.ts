import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LegalConsultationController } from './legal-consultation/legal-consultation.controller';
import { LegalConsultationService } from './legal-consultation/legal-consultation.service';
import { LegalConsultationSectionService } from './legal-consultation/legal-consultation-section.service';
import {
  LegalConsultationItem,
  LegalConsultationItemSchema,
} from 'src/database/schemas/cms/legal-consultation-item.schema';
import {
  LegalConsultationSection,
  LegalConsultationSectionSchema,
} from 'src/database/schemas/cms/legal-consultation-section.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LegalConsultationItem.name, schema: LegalConsultationItemSchema },
      {
        name: LegalConsultationSection.name,
        schema: LegalConsultationSectionSchema,
      },
    ]),
  ],
  controllers: [LegalConsultationController],
  providers: [LegalConsultationService, LegalConsultationSectionService],
  exports: [LegalConsultationService, LegalConsultationSectionService],
})
export class LegalModule {}
