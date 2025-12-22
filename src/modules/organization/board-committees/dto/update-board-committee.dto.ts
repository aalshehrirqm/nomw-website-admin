import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardCommitteeDto } from './create-board-committee.dto';

export class UpdateBoardCommitteeDto extends PartialType(
  CreateBoardCommitteeDto,
) {}
