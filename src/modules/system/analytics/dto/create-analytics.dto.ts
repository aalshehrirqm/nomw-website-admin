import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDate,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAnalyticsDto {
  @IsNotEmpty()
  @IsString()
  page: string;

  @IsNotEmpty()
  @IsString()
  path: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  views?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  uniqueVisitors?: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @IsOptional()
  @IsString()
  referrer?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;

  @IsOptional()
  @IsString()
  country?: string;
}
