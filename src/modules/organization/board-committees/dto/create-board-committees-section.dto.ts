import {
  IsNotEmpty,
  IsBoolean,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class LocalizedStringDto {
  @IsNotEmpty()
  ar: string;

  @IsNotEmpty()
  en: string;
}

export class CreateBoardCommitteesSectionDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  subtitle: LocalizedStringDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
