import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDate,
  IsNumber,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  InvestmentStatus,
  RiskLevel,
} from '../../../../database/schemas/cms/investment-opportunity.schema';

class LocalizedStringDto {
  @IsNotEmpty()
  @IsString()
  ar: string;

  @IsNotEmpty()
  @IsString()
  en: string;
}

class InvestmentDocumentDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  name: LocalizedStringDto;

  @IsNotEmpty()
  @IsString()
  fileUrl: string;
}

export class CreateInvestmentOpportunityDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  title: LocalizedStringDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => LocalizedStringDto)
  description: LocalizedStringDto;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  minInvestment?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  expectedReturn?: number;

  @IsOptional()
  @IsEnum(RiskLevel)
  riskLevel?: RiskLevel;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deadline?: Date;

  @IsOptional()
  @IsEnum(InvestmentStatus)
  status?: InvestmentStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LocalizedStringDto)
  features?: LocalizedStringDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvestmentDocumentDto)
  documents?: InvestmentDocumentDto[];

  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
