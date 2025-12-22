import { PartialType } from '@nestjs/mapped-types';
import { CreateCeoWordsDto } from './create-ceo-words.dto';

export class UpdateCeoWordsDto extends PartialType(CreateCeoWordsDto) {}
