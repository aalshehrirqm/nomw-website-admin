import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
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

export class CreateOrganizationalStructureDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  subtitle: LocalizedStringDto;

  @IsOptional()
  @IsString()
  image_ar?: string;

  @IsOptional()
  @IsString()
  image_en?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
