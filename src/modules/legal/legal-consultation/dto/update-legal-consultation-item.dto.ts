import { PartialType } from '@nestjs/mapped-types';
import { CreateLegalConsultationItemDto } from './create-legal-consultation-item.dto';

export class UpdateLegalConsultationItemDto extends PartialType(
  CreateLegalConsultationItemDto,
) {}
