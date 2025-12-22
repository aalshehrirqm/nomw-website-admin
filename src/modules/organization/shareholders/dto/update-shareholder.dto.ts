import { PartialType } from '@nestjs/mapped-types';
import { CreateShareholderDto } from './create-shareholder.dto';

export class UpdateShareholderDto extends PartialType(CreateShareholderDto) {}
