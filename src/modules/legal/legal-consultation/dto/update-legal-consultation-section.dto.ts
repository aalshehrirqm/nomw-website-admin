import { PartialType } from '@nestjs/mapped-types';
import { CreateLegalConsultationSectionDto } from './create-legal-consultation-section.dto';

export class UpdateLegalConsultationSectionDto extends PartialType(
  CreateLegalConsultationSectionDto,
) {}
