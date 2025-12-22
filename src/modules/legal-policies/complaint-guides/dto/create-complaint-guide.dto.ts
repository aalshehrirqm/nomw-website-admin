import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedStringDto {
  @IsNotEmpty()
  @IsString()
  ar: string;

  @IsNotEmpty()
  @IsString()
  en: string;
}

class GuideStepDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  order: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description: LocalizedStringDto;
}

export class CreateComplaintGuideDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  content: LocalizedStringDto;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GuideStepDto)
  steps?: GuideStepDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
