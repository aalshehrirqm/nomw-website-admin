import {
    IsNotEmpty,
    IsString,
    IsEnum,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsObject,
    IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { GovernanceContentType } from '../../../database/schemas/cms/governance-content.schema';

export class CreateGovernanceContentDto {
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try { return JSON.parse(value); } catch { return value; }
        }
        return value;
    })
    @IsNotEmpty()
    @IsObject()
    title: { ar: string; en: string };

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try { return JSON.parse(value); } catch { return value; }
        }
        return value;
    })
    @IsOptional()
    @IsObject()
    description?: { ar: string; en: string };

    @IsNotEmpty()
    @IsEnum(GovernanceContentType)
    type: GovernanceContentType;

    @IsOptional()
    @IsString()
    icon?: string;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try { return JSON.parse(value); } catch { return value; }
        }
        return value;
    })
    @IsOptional()
    @IsArray()
    list?: { ar: string; en: string }[];

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            try { return JSON.parse(value); } catch { return value; }
        }
        return value;
    })
    @IsOptional()
    @IsObject()
    footer?: { ar: string; en: string };

    @Transform(({ value }) => {
        if (typeof value === 'string') { return parseInt(value, 10); }
        return value;
    })
    @IsOptional()
    @IsNumber()
    order?: number;

    @Transform(({ value }) => {
        if (typeof value === 'string') { return value === 'true'; }
        return value;
    })
    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
