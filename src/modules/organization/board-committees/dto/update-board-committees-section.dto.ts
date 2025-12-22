import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardCommitteesSectionDto } from './create-board-committees-section.dto';

export class UpdateBoardCommitteesSectionDto extends PartialType(
  CreateBoardCommitteesSectionDto,
) {}
