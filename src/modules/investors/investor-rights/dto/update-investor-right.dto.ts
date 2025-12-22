import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestorRightDto } from './create-investor-right.dto';

export class UpdateInvestorRightDto extends PartialType(
  CreateInvestorRightDto,
) {}
