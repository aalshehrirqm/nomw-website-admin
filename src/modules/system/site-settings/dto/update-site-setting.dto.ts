import { IsOptional, IsString, IsEnum } from 'class-validator';
import { SettingType } from '../../../../database/schemas/cms/site-setting.schema';

export class UpdateSiteSettingDto {
  @IsOptional()
  value?: any;

  @IsOptional()
  @IsEnum(SettingType)
  type?: SettingType;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
