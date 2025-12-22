import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
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

export class CreateMarqueeWarningDto {
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  message: TranslatedTextDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
