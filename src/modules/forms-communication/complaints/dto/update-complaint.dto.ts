import { IsOptional, IsString, IsEnum } from 'class-validator';
import { ComplaintStatus } from '../../../../database/schemas/cms/complaint.schema';

export class UpdateComplaintDto {
  @IsOptional()
  @IsEnum(ComplaintStatus)
  status?: ComplaintStatus;

  @IsOptional()
  @IsString()
  response?: string;
}
