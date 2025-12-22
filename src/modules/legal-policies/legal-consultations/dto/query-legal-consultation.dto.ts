import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class QueryLegalConsultationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  category?: string;
}
