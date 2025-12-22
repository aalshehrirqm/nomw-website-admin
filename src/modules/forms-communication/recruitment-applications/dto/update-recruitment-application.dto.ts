import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ApplicationStatus } from '../../../../database/schemas/cms/recruitment-application.schema';

export class UpdateRecruitmentApplicationDto {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsString()
  notes?: string;
}
