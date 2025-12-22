import { PartialType } from '@nestjs/mapped-types';
import { CreateMarqueeWarningDto } from './create-marquee-warning.dto';

export class UpdateMarqueeWarningDto extends PartialType(
  CreateMarqueeWarningDto,
) {}
