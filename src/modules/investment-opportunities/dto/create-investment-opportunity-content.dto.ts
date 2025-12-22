import {
    IsNotEmpty,
    IsString,
    IsEnum,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsObject,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { OpportunityContentType } from '../../../database/schemas/cms/investment-opportunity-content.schema';

export class CreateInvestmentOpportunityContentDto {
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        }
        return value;
    })
    @IsNotEmpty()
    @IsObject()
    title: { ar: string; en: string };

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        }
        return value;
    })
    @IsNotEmpty()
    @IsObject()
    description: { ar: string; en: string };

    @IsNotEmpty()
    @IsEnum(OpportunityContentType)
    type: OpportunityContentType;

    @IsOptional()
    @IsString()
    image?: string;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return parseInt(value, 10);
        }
        return value;
    })
    @IsOptional()
    @IsNumber()
    order?: number;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value === 'true';
        }
        return value;
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
