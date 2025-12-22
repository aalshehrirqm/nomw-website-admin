import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorsRightsSectionDto } from './create-investors-rights-section.dto';

export class UpdateInvestorsRightsSectionDto extends PartialType(
  CreateInvestorsRightsSectionDto,
) {}
