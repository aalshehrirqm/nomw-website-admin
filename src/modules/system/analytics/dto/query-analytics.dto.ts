import { IsOptional, IsString, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class QueryAnalyticsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  pageName?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  endDate?: Date;

  @IsOptional()
  @IsString()
  country?: string;
}
