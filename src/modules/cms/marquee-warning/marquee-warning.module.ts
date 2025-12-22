import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MarqueeWarningController } from './marquee-warning.controller';
import { MarqueeWarningService } from './marquee-warning.service';
import {
  MarqueeWarning,
  MarqueeWarningSchema,
} from 'src/database/schemas/cms/marquee-warning.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from 'src/database/schemas/cms/activity-log.schema';
import { AuthModule } from '../../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MarqueeWarning.name, schema: MarqueeWarningSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
    AuthModule,
  ],
  controllers: [MarqueeWarningController],
  providers: [MarqueeWarningService],
  exports: [MarqueeWarningService],
})
export class MarqueeWarningModule { }
