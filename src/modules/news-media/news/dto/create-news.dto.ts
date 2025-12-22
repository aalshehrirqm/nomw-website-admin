import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  ValidateNested,
  Matches,
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

export class CreateNewsDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  excerpt: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  content: LocalizedStringDto;

  @IsOptional()
  @IsString()
  image?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  category: LocalizedStringDto;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  publishDate: Date;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
