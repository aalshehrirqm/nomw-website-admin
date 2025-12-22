import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import {
  HeroSection,
  HeroSectionSchema,
} from '../../database/schemas/cms/hero-section.schema';
import {
  CeoWords,
  CeoWordsSchema,
} from '../../database/schemas/cms/ceo-words.schema';
import { Vision, VisionSchema } from '../../database/schemas/cms/vision.schema';
import {
  Service,
  ServiceSchema,
} from '../../database/schemas/cms/service.schema';
import {
  CompanyOverview,
  CompanyOverviewSchema,
} from '../../database/schemas/cms/company-overview.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from '../../database/schemas/cms/activity-log.schema';

// Hero Section
import { HeroSectionController } from './hero-section/hero-section.controller';
import { HeroSectionService } from './hero-section/hero-section.service';

// CEO Words
import { CeoWordsController } from './ceo-words/ceo-words.controller';
import { CeoWordsService } from './ceo-words/ceo-words.service';

// Vision
import { VisionController } from './vision/vision.controller';
import { VisionService } from './vision/vision.service';

// Services
import { ServicesController } from './services/services.controller';
import { ServicesService } from './services/services.service';

// Company Overview
import { CompanyOverviewController } from './company-overview/company-overview.controller';
import { CompanyOverviewService } from './company-overview/company-overview.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HeroSection.name, schema: HeroSectionSchema },
      { name: CeoWords.name, schema: CeoWordsSchema },
      { name: Vision.name, schema: VisionSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: CompanyOverview.name, schema: CompanyOverviewSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
    AuthModule,
  ],
  controllers: [
    HeroSectionController,
    CeoWordsController,
    VisionController,
    ServicesController,
    CompanyOverviewController,
  ],
  providers: [
    HeroSectionService,
    CeoWordsService,
    VisionService,
    ServicesService,
    CompanyOverviewService,
  ],
  exports: [
    HeroSectionService,
    CeoWordsService,
    VisionService,
    ServicesService,
    CompanyOverviewService,
  ],
})
export class ContentManagementModule { }
