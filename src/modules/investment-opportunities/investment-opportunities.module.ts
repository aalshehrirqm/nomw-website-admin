import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
    InvestmentOpportunityContent,
    InvestmentOpportunityContentSchema,
} from '../../database/schemas/cms/investment-opportunity-content.schema';
import {
    ActivityLog,
    ActivityLogSchema,
} from '../../database/schemas/cms/activity-log.schema';
import { InvestmentOpportunityContentController } from './investment-opportunity-content.controller';
import { InvestmentOpportunityContentService } from './investment-opportunity-content.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: InvestmentOpportunityContent.name,
                schema: InvestmentOpportunityContentSchema,
            },
            { name: ActivityLog.name, schema: ActivityLogSchema },
        ]),
        AuthModule,
    ],
    controllers: [InvestmentOpportunityContentController],
    providers: [InvestmentOpportunityContentService],
    exports: [InvestmentOpportunityContentService],
})
export class InvestmentOpportunitiesModule { }
