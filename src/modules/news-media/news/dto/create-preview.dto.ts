import { IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TranslatablePreviewDto {
    @IsNotEmpty()
    @IsString()
    ar: string;

    @IsNotEmpty()
    @IsString()
    en: string;
}

export class CreatePreviewDto {
    @ValidateNested()
    @Type(() => TranslatablePreviewDto)
    title: TranslatablePreviewDto;

    @ValidateNested()
    @Type(() => TranslatablePreviewDto)
    excerpt: TranslatablePreviewDto;

    @ValidateNested()
    @Type(() => TranslatablePreviewDto)
    content: TranslatablePreviewDto;

    @IsOptional()
    @IsString()
    coverImage?: string;

    @IsOptional()
    @IsString()
    slug?: string;
}
