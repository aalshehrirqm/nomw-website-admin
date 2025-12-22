import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import {
  InvestorRight,
  InvestorRightSchema,
} from '../../database/schemas/cms/investor-right.schema';
import {
  InvestorsRightsSection,
  InvestorsRightsSectionSchema,
} from '../../database/schemas/cms/investors-rights-section.schema';
import { InvestorRightsController } from './investor-rights/investor-rights.controller';
import { InvestorRightsService } from './investor-rights/investor-rights.service';
import { InvestorsRightsSectionService } from './investor-rights/investors-rights-section.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InvestorRight.name, schema: InvestorRightSchema },
      {
        name: InvestorsRightsSection.name,
        schema: InvestorsRightsSectionSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [InvestorRightsController],
  providers: [InvestorRightsService, InvestorsRightsSectionService],
  exports: [InvestorRightsService, InvestorsRightsSectionService],
})
export class InvestorsModule {}
