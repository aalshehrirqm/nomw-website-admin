import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  ValidateNested,
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

export class CreateLegalConsultationDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  content: LocalizedStringDto;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  publishDate: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
