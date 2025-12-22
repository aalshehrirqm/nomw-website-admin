import { IsOptional, IsEnum, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { ReportType } from '../../../../database/schemas/cms/periodic-report.schema';

export class QueryPeriodicReportDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ReportType)
  type?: ReportType;

  @IsOptional()
  @IsNumber()
  @Min(2000)
  @Type(() => Number)
  year?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  quarter?: number;
}
