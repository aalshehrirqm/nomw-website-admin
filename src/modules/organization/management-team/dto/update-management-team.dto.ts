import { PartialType } from '@nestjs/mapped-types';
import { CreateManagementTeamDto } from './create-management-team.dto';

export class UpdateManagementTeamDto extends PartialType(
  CreateManagementTeamDto,
) {}
