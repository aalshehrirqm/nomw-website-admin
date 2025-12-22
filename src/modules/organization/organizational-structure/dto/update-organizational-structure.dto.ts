import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationalStructureDto } from './create-organizational-structure.dto';

export class UpdateOrganizationalStructureDto extends PartialType(
  CreateOrganizationalStructureDto,
) {}
