import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  Min,
  Max,
} from 'class-validator';

export class CreateAwardDto {
  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  order?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
