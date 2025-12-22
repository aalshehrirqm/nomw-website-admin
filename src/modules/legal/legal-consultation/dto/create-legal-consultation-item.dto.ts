import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
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

export class CreateLegalConsultationItemDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  order: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
