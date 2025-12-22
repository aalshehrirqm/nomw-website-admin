import { PartialType } from '@nestjs/mapped-types';
import { CreateGovernanceContentDto } from './create-governance-content.dto';

export class UpdateGovernanceContentDto extends PartialType(CreateGovernanceContentDto) { }
