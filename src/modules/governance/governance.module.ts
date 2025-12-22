import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GovernanceContent, GovernanceContentSchema } from '../../database/schemas/cms/governance-content.schema';
import { ActivityLog, ActivityLogSchema } from '../../database/schemas/cms/activity-log.schema';
import { GovernanceContentController } from './governance-content.controller';
import { GovernanceContentService } from './governance-content.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: GovernanceContent.name, schema: GovernanceContentSchema },
            { name: ActivityLog.name, schema: ActivityLogSchema },
        ]),
        AuthModule,
    ],
    controllers: [GovernanceContentController],
    providers: [GovernanceContentService],
    exports: [GovernanceContentService],
})
export class GovernanceModule { }
