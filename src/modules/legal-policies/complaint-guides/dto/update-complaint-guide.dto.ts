import { PartialType } from '@nestjs/mapped-types';
import { CreateComplaintGuideDto } from './create-complaint-guide.dto';

export class UpdateComplaintGuideDto extends PartialType(
  CreateComplaintGuideDto,
) {}
