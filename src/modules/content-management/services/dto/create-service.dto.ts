import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  IsNumber,
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

class SubServiceDto {
  @IsString()
  @IsOptional()
  serviceId?: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  title: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  description: TranslatedTextDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslatedTextDto)
  @IsOptional()
  types?: TranslatedTextDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslatedTextDto)
  @IsOptional()
  items?: TranslatedTextDto[];
}

export class CreateServiceDto {
  @IsString()
  @IsOptional()
  serviceId?: string;

  @IsString()
  @IsNotEmpty()
  icon: string;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  title: TranslatedTextDto;

  @ValidateNested()
  @Type(() => TranslatedTextDto)
  @IsNotEmpty()
  description: TranslatedTextDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslatedTextDto)
  @IsOptional()
  types?: TranslatedTextDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TranslatedTextDto)
  @IsOptional()
  items?: TranslatedTextDto[];

  @IsBoolean()
  @IsOptional()
  hasSubServices?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubServiceDto)
  @IsOptional()
  subServices?: SubServiceDto[];

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
