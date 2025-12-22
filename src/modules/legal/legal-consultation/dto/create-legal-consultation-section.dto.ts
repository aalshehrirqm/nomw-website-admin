import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
  IsString,
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

export class CreateLegalConsultationSectionDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  heroTitle: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  heroDescription: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  heroSubtitle: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  buttonText: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  listTitle: LocalizedStringDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
