import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import { Media, MediaSchema } from '../../database/schemas/cms/media.schema';
import {
  SiteSetting,
  SiteSettingSchema,
} from '../../database/schemas/cms/site-setting.schema';
import {
  Analytics,
  AnalyticsSchema,
} from '../../database/schemas/cms/analytics.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from '../../database/schemas/cms/activity-log.schema';

// Media
import { MediaController } from './media/media.controller';
import { MediaService } from './media/media.service';

// Site Settings
import { SiteSettingsController } from './site-settings/site-settings.controller';
import { SiteSettingsService } from './site-settings/site-settings.service';

// Analytics
import { AnalyticsController } from './analytics/analytics.controller';
import { AnalyticsService } from './analytics/analytics.service';

// Activity Logs
import { ActivityLogsController } from './activity-logs/activity-logs.controller';
import { ActivityLogsService } from './activity-logs/activity-logs.service';

// Dashboard
import { DashboardModule } from './dashboard/dashboard.module';

import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Media.name, schema: MediaSchema },
      { name: SiteSetting.name, schema: SiteSettingSchema },
      { name: Analytics.name, schema: AnalyticsSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
    AuthModule,
    forwardRef(() => DashboardModule),
  ],
  controllers: [
    MediaController,
    SiteSettingsController,
    AnalyticsController,
    ActivityLogsController,
  ],
  providers: [
    MediaService,
    SiteSettingsService,
    AnalyticsService,
    ActivityLogsService,
  ],
  exports: [
    MediaService,
    SiteSettingsService,
    AnalyticsService,
    ActivityLogsService,
  ],
})
export class SystemModule { }
