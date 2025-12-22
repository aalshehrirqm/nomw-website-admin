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

export class CreateCompanyOverviewDto {
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  title: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  content: TranslatedTextDto;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
