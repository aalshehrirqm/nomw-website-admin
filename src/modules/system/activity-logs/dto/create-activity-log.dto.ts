import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateActivityLogDto {
  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  entityType: string;

  @IsOptional()
  @IsString()
  entityId?: string;

  @IsOptional()
  changes?: any;

  @IsOptional()
  @IsString()
  ipAddress?: string;

  @IsOptional()
  @IsString()
  userAgent?: string;
}
