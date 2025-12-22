import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { SettingType } from '../../../../database/schemas/cms/site-setting.schema';

export class CreateSiteSettingDto {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  value: any;

  @IsNotEmpty()
  @IsEnum(SettingType)
  type: SettingType;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  description?: string;
}
