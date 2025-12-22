import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import {
  PeriodicReport,
  PeriodicReportSchema,
} from '../../database/schemas/cms/periodic-report.schema';
import {
  GovernanceDocument,
  GovernanceDocumentSchema,
} from '../../database/schemas/cms/governance-document.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from '../../database/schemas/cms/activity-log.schema';

// Periodic Reports
import { PeriodicReportsController } from './periodic-reports/periodic-reports.controller';
import { PeriodicReportsService } from './periodic-reports/periodic-reports.service';

// Governance Documents
import { GovernanceDocumentsController } from './governance-documents/governance-documents.controller';
import { GovernanceDocumentsService } from './governance-documents/governance-documents.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PeriodicReport.name, schema: PeriodicReportSchema },
      { name: GovernanceDocument.name, schema: GovernanceDocumentSchema },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
    AuthModule,
  ],
  controllers: [PeriodicReportsController, GovernanceDocumentsController],
  providers: [PeriodicReportsService, GovernanceDocumentsService],
  exports: [PeriodicReportsService, GovernanceDocumentsService],
})
export class ReportsDocumentsModule {
  // Auto-seeding removed - run manually via: npm run seed:periodic-reports
}
