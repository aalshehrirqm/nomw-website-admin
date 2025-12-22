import { PartialType } from '@nestjs/mapped-types';
import { CreateLegalConsultationDto } from './create-legal-consultation.dto';

export class UpdateLegalConsultationDto extends PartialType(
  CreateLegalConsultationDto,
) {}
