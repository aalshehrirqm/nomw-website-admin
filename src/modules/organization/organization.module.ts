import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';

// Schemas
import {
  BoardMember,
  BoardMemberSchema,
} from '../../database/schemas/cms/board-member.schema';
import {
  BoardCommittee,
  BoardCommitteeSchema,
} from '../../database/schemas/cms/board-committee.schema';
import {
  BoardCommitteesSection,
  BoardCommitteesSectionSchema,
} from '../../database/schemas/cms/board-committees-section.schema';
import {
  ManagementTeam,
  ManagementTeamSchema,
} from '../../database/schemas/cms/management-team.schema';
import {
  Shareholder,
  ShareholderSchema,
} from '../../database/schemas/cms/shareholder.schema';
import {
  OrganizationalStructure,
  OrganizationalStructureSchema,
} from '../../database/schemas/cms/organizational-structure.schema';
import {
  ActivityLog,
  ActivityLogSchema,
} from '../../database/schemas/cms/activity-log.schema';

// Board Members
import { BoardMembersController } from './board-members/board-members.controller';
import { BoardMembersService } from './board-members/board-members.service';

// Board Committees
import { BoardCommitteesController } from './board-committees/board-committees.controller';
import { BoardCommitteesService } from './board-committees/board-committees.service';
import { BoardCommitteesSectionService } from './board-committees/board-committees-section.service';

// Management Team
import { ManagementTeamController } from './management-team/management-team.controller';
import { ManagementTeamService } from './management-team/management-team.service';

// Shareholders
import { ShareholdersController } from './shareholders/shareholders.controller';
import { ShareholdersService } from './shareholders/shareholders.service';

// Organizational Structure
import { OrganizationalStructureController } from './organizational-structure/organizational-structure.controller';
import { OrganizationalStructureService } from './organizational-structure/organizational-structure.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BoardMember.name, schema: BoardMemberSchema },
      { name: BoardCommittee.name, schema: BoardCommitteeSchema },
      {
        name: BoardCommitteesSection.name,
        schema: BoardCommitteesSectionSchema,
      },
      { name: ManagementTeam.name, schema: ManagementTeamSchema },
      { name: Shareholder.name, schema: ShareholderSchema },
      {
        name: OrganizationalStructure.name,
        schema: OrganizationalStructureSchema,
      },
      { name: ActivityLog.name, schema: ActivityLogSchema },
    ]),
    AuthModule,
  ],
  controllers: [
    BoardMembersController,
    BoardCommitteesController,
    ManagementTeamController,
    ShareholdersController,
    OrganizationalStructureController,
  ],
  providers: [
    BoardMembersService,
    BoardCommitteesService,
    BoardCommitteesSectionService,
    ManagementTeamService,
    ShareholdersService,
    OrganizationalStructureService,
  ],
  exports: [
    BoardMembersService,
    BoardCommitteesService,
    BoardCommitteesSectionService,
    ManagementTeamService,
    ShareholdersService,
    OrganizationalStructureService,
  ],
})
export class OrganizationModule { }
