import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
  IsEnum,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ReportType } from '../../../../database/schemas/cms/periodic-report.schema';

class LocalizedStringDto {
  @IsNotEmpty()
  @IsString()
  ar: string;

  @IsNotEmpty()
  @IsString()
  en: string;
}

export class CreatePeriodicReportDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @IsEnum(ReportType)
  type: ReportType;

  @IsNotEmpty()
  @IsNumber()
  @Min(2000)
  year: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  quarter?: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  fileUrl?: string; // Deprecated

  @IsOptional()
  @IsString()
  @IsUrl()
  fileUrlAr?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  fileUrlEn?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  thumbnailImage?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  publishDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fileSize?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
