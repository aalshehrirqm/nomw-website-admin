import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { News, NewsSchema } from '../../database/schemas/cms/news.schema';
import { User, UserSchema } from '../../database/schemas/user.schema';
import { Award, AwardSchema } from '../../database/schemas/cms/award.schema';
import {
  PeriodicReport,
  PeriodicReportSchema,
} from '../../database/schemas/cms/periodic-report.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from '../../database/schemas/cms/activity-log.schema';
import { AuthModule } from '../auth/auth.module';
import { SystemModule } from '../system/system.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: User.name, schema: UserSchema },
      { name: Award.name, schema: AwardSchema },
      { name: PeriodicReport.name, schema: PeriodicReportSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
    AuthModule,
    forwardRef(() => SystemModule),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule { }
