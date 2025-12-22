import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { ApplicationStatus } from '../../../../database/schemas/cms/recruitment-application.schema';

export class QueryRecruitmentApplicationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;

  @IsOptional()
  @IsString()
  position?: string;
}
