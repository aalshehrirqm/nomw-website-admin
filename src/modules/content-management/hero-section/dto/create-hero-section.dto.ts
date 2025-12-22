import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class TranslatedTextDto {
  @IsString()
  @IsNotEmpty()
  ar: string;

  @IsString()
  @IsNotEmpty()
  en: string;
}

export class CreateHeroSectionDto {
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  title: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  subtitle: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  ctaText: TranslatedTextDto;

  @IsString()
  @IsNotEmpty()
  ctaLink: string;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsOptional()
  scrollDownText?: TranslatedTextDto;

  @IsString()
  @IsOptional()
  backgroundImage?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsOptional()
  order?: number;
}
