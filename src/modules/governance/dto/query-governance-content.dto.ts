import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryGovernanceContentDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    page?: number;

    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    type?: string;
}
