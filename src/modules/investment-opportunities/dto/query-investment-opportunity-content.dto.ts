import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { OpportunityContentType } from '../../../database/schemas/cms/investment-opportunity-content.schema';

export class QueryInvestmentOpportunityContentDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OpportunityContentType)
    type?: OpportunityContentType;

    @IsOptional()
    @IsString()
    search?: string;
}
