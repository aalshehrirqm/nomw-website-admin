import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardContentDto } from './create-board-content.dto';

export class UpdateBoardContentDto extends PartialType(CreateBoardContentDto) { }
