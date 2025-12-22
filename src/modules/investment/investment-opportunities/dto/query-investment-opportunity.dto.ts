import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import {
  InvestmentStatus,
  RiskLevel,
} from '../../../../database/schemas/cms/investment-opportunity.schema';

export class QueryInvestmentOpportunityDto extends PaginationDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(InvestmentStatus)
  status?: InvestmentStatus;

  @IsOptional()
  @IsEnum(RiskLevel)
  riskLevel?: RiskLevel;
}
