import { IsOptional, IsEnum, IsString } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';
import { ComplaintStatus } from '../../../../database/schemas/cms/complaint.schema';

export class QueryComplaintDto extends PaginationDto {
  @IsOptional()
  @IsEnum(ComplaintStatus)
  status?: ComplaintStatus;

  @IsOptional()
  @IsString()
  complaintType?: string;

  @IsOptional()
  @IsString()
  referenceNumber?: string;
}
