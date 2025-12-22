import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import { News, NewsSchema } from '../../database/schemas/cms/news.schema';
import { Award, AwardSchema } from '../../database/schemas/cms/award.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from '../../database/schemas/cms/activity-log.schema';

// News
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';

// Awards
import { AwardsController } from './awards/awards.controller';
import { AwardsService } from './awards/awards.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: News.name, schema: NewsSchema },
      { name: Award.name, schema: AwardSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
    AuthModule,
  ],
  controllers: [NewsController, AwardsController],
  providers: [NewsService, AwardsService],
  exports: [NewsService, AwardsService],
})
export class NewsMediaModule {}
