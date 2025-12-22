import { PartialType } from '@nestjs/mapped-types';
import { CreatePeriodicReportDto } from './create-periodic-report.dto';

export class UpdatePeriodicReportDto extends PartialType(
  CreatePeriodicReportDto,
) {}
