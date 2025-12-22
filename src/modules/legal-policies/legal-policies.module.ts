import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import {
  LegalConsultation,
  LegalConsultationSchema,
} from '../../database/schemas/cms/legal-consultation.schema';
import {
  PrivacyPolicy,
  PrivacyPolicySchema,
} from '../../database/schemas/cms/privacy-policy.schema';
import {
  ComplaintGuide,
  ComplaintGuideSchema,
} from '../../database/schemas/cms/complaint-guide.schema';

// Legal Consultations
import { LegalConsultationsController } from './legal-consultations/legal-consultations.controller';
import { LegalConsultationsService } from './legal-consultations/legal-consultations.service';

// Privacy Policies
import { PrivacyPoliciesController } from './privacy-policies/privacy-policies.controller';
import { PrivacyPoliciesService } from './privacy-policies/privacy-policies.service';

// Complaint Guides
import { ComplaintGuidesController } from './complaint-guides/complaint-guides.controller';
import { ComplaintGuidesService } from './complaint-guides/complaint-guides.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LegalConsultation.name, schema: LegalConsultationSchema },
      { name: PrivacyPolicy.name, schema: PrivacyPolicySchema },
      { name: ComplaintGuide.name, schema: ComplaintGuideSchema },
    ]),
    AuthModule,
  ],
  controllers: [
    LegalConsultationsController,
    PrivacyPoliciesController,
    ComplaintGuidesController,
  ],
  providers: [
    LegalConsultationsService,
    PrivacyPoliciesService,
    ComplaintGuidesService,
  ],
  exports: [
    LegalConsultationsService,
    PrivacyPoliciesService,
    ComplaintGuidesService,
  ],
})
export class LegalPoliciesModule {}
