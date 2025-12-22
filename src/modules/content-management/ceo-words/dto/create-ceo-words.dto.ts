import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
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

export class CreateCeoWordsDto {
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  title: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  name: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  position: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  message: TranslatedTextDto;

  @IsString()
  @IsOptional()
  image?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
