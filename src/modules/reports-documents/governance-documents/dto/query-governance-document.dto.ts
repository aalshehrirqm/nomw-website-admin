import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class QueryGovernanceDocumentDto extends PaginationDto {
  @IsOptional()
  @IsString()
  documentType?: string;
}
