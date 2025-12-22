import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import {
  ContactMessage,
  ContactMessageSchema,
} from '../../database/schemas/cms/contact-message.schema';
import {
  RecruitmentApplication,
  RecruitmentApplicationSchema,
} from '../../database/schemas/cms/recruitment-application.schema';
import {
  Complaint,
  ComplaintSchema,
} from '../../database/schemas/cms/complaint.schema';

// Contact Messages
import { ContactMessagesController } from './contact-messages/contact-messages.controller';
import { ContactMessagesService } from './contact-messages/contact-messages.service';

// Recruitment Applications
import { RecruitmentApplicationsController } from './recruitment-applications/recruitment-applications.controller';
import { RecruitmentApplicationsService } from './recruitment-applications/recruitment-applications.service';

// Complaints
import { ComplaintsController } from './complaints/complaints.controller';
import { ComplaintsService } from './complaints/complaints.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ContactMessage.name, schema: ContactMessageSchema },
      {
        name: RecruitmentApplication.name,
        schema: RecruitmentApplicationSchema,
      },
      { name: Complaint.name, schema: ComplaintSchema },
    ]),
    AuthModule,
  ],
  controllers: [
    ContactMessagesController,
    RecruitmentApplicationsController,
    ComplaintsController,
  ],
  providers: [
    ContactMessagesService,
    RecruitmentApplicationsService,
    ComplaintsService,
  ],
  exports: [
    ContactMessagesService,
    RecruitmentApplicationsService,
    ComplaintsService,
  ],
})
export class FormsCommunicationModule {}
