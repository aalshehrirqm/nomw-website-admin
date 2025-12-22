import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyOverviewDto } from './create-company-overview.dto';

export class UpdateCompanyOverviewDto extends PartialType(
  CreateCompanyOverviewDto,
) {}
