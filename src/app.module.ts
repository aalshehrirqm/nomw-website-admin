import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ContentManagementModule } from './modules/content-management/content-management.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { InvestorsModule } from './modules/investors/investors.module';
import { NewsMediaModule } from './modules/news-media/news-media.module';
import { ReportsDocumentsModule } from './modules/reports-documents/reports-documents.module';
import { InvestmentModule } from './modules/investment/investment.module';
import { FormsCommunicationModule } from './modules/forms-communication/forms-communication.module';
import { LegalPoliciesModule } from './modules/legal-policies/legal-policies.module';
import { LegalModule } from './modules/legal/legal.module';
import { SystemModule } from './modules/system/system.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { MarqueeWarningModule } from './modules/cms/marquee-warning/marquee-warning.module';
import { InvestmentOpportunitiesModule } from './modules/investment-opportunities/investment-opportunities.module';
import { GovernanceModule } from './modules/governance/governance.module';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/nomw-database',
      }),
    }),
    AuthModule,
    ContentManagementModule,
    OrganizationModule,
    InvestorsModule,
    NewsMediaModule,
    ReportsDocumentsModule,
    InvestmentModule,
    FormsCommunicationModule,
    LegalPoliciesModule,
    LegalModule,
    SystemModule,
    DashboardModule,
    MarqueeWarningModule,
    InvestmentOpportunitiesModule,
    GovernanceModule,
    BoardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
