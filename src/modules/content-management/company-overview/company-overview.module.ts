import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyOverviewService } from './company-overview.service';
import { CompanyOverviewController } from './company-overview.controller';
import {
  CompanyOverview,
  CompanyOverviewSchema,
} from '../../../database/schemas/cms/company-overview.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyOverview.name, schema: CompanyOverviewSchema },
    ]),
  ],
  controllers: [CompanyOverviewController],
  providers: [CompanyOverviewService],
  exports: [CompanyOverviewService],
})
export class CompanyOverviewModule {}
