import { PartialType } from '@nestjs/mapped-types';
import { CreateGovernanceDocumentDto } from './create-governance-document.dto';

export class UpdateGovernanceDocumentDto extends PartialType(
  CreateGovernanceDocumentDto,
) {}
