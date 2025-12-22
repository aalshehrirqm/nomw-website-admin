import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UploadFileDto {
  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  entityType?: string;

  @IsOptional()
  @IsString()
  entityId?: string;

  @IsOptional()
  @IsString()
  altAr?: string;

  @IsOptional()
  @IsString()
  altEn?: string;
}
