import { PartialType } from '@nestjs/mapped-types';
import { CreateInvestmentOpportunityContentDto } from './create-investment-opportunity-content.dto';

export class UpdateInvestmentOpportunityContentDto extends PartialType(
    CreateInvestmentOpportunityContentDto,
) { }
