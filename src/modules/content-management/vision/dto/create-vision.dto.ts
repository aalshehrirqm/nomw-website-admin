import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
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

class ValueItemDto {
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  text: TranslatedTextDto;
}

export class CreateVisionDto {
  // Main Section Title
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  sectionTitle: TranslatedTextDto;

  // Vision Section
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  visionTitle: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  visionDescription: TranslatedTextDto;

  // Mission Section
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  missionTitle: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  missionDescription: TranslatedTextDto;

  // Values Section
  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  valuesTitle: TranslatedTextDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ValueItemDto)
  @IsOptional()
  values?: ValueItemDto[];

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
