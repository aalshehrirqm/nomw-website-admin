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

export class CreatePrivacyPolicyDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  content: LocalizedStringDto;

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  effectiveDate: Date;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
