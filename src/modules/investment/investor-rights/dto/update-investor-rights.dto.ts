import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorRightsDto } from './create-investor-rights.dto';

export class UpdateInvestorRightsDto extends PartialType(
  CreateInvestorRightsDto,
) {}
