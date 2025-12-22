import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { NewsSchema } from '../../../database/schemas/cms/news.schema';
import { PeriodicReportSchema } from '../../../database/schemas/cms/periodic-report.schema';
import { InvestmentOpportunitySchema } from '../../../database/schemas/cms/investment-opportunity.schema';
import { BoardMemberSchema } from '../../../database/schemas/cms/board-member.schema';
import { LegalConsultationSchema } from '../../../database/schemas/cms/legal-consultation.schema';
import { UserSchema } from '../../../database/schemas/user.schema';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'News', schema: NewsSchema },
      { name: 'PeriodicReport', schema: PeriodicReportSchema },
      { name: 'InvestmentOpportunity', schema: InvestmentOpportunitySchema },
      { name: 'BoardMember', schema: BoardMemberSchema },
      { name: 'LegalConsultation', schema: LegalConsultationSchema },
      { name: 'User', schema: UserSchema },
    ]),
    AuthModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
