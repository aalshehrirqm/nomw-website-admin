import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardContent, BoardContentSchema } from '../../database/schemas/cms/board-content.schema';
import { ActivityLog, ActivityLogSchema } from '../../database/schemas/cms/activity-log.schema';
import { BoardContentController } from './board-content.controller';
import { BoardContentService } from './board-content.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: BoardContent.name, schema: BoardContentSchema },
            { name: ActivityLog.name, schema: ActivityLogSchema },
        ]),
        AuthModule,
    ],
    controllers: [BoardContentController],
    providers: [BoardContentService],
    exports: [BoardContentService],
})
export class BoardModule { }
