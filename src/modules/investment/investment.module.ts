import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import {
  InvestmentOpportunity,
  InvestmentOpportunitySchema,
} from '../../database/schemas/cms/investment-opportunity.schema';
import {
  InvestorRights,
  InvestorRightsSchema,
} from '../../database/schemas/cms/investor-rights.schema';

// Investment Opportunities
import { InvestmentOpportunitiesController } from './investment-opportunities/investment-opportunities.controller';
import { InvestmentOpportunitiesService } from './investment-opportunities/investment-opportunities.service';

// Investor Rights
import { InvestorRightsController } from './investor-rights/investor-rights.controller';
import { InvestorRightsService } from './investor-rights/investor-rights.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InvestmentOpportunity.name, schema: InvestmentOpportunitySchema },
      { name: InvestorRights.name, schema: InvestorRightsSchema },
    ]),
    AuthModule,
  ],
  controllers: [InvestmentOpportunitiesController, InvestorRightsController],
  providers: [InvestmentOpportunitiesService, InvestorRightsService],
  exports: [InvestmentOpportunitiesService, InvestorRightsService],
})
export class InvestmentModule {}
