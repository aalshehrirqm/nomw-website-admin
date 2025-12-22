import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ActivityLogsService } from './activity-logs.service';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { QueryActivityLogDto } from './dto/query-activity-log.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';

@Controller({ path: 'activity-logs', version: '1' })
export class ActivityLogsController {
  constructor(private readonly activityLogsService: ActivityLogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createDto: CreateActivityLogDto,
    @GetUser('userId') userId: string,
  ) {
    return this.activityLogsService.create(createDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  findAll(@Query() queryDto: QueryActivityLogDto) {
    return this.activityLogsService.findAll(queryDto);
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  getStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return this.activityLogsService.getStats(
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined,
    );
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  findByUser(@Param('userId') userId: string, @Query('limit') limit?: string) {
    return this.activityLogsService.findByUser(
      userId,
      limit ? parseInt(limit) : 50,
    );
  }

  @Get('entity/:entityType/:entityId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  findByEntity(
    @Param('entityType') entityType: string,
    @Param('entityId') entityId: string,
  ) {
    return this.activityLogsService.findByEntity(entityType, entityId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  findOne(@Param() params: MongoIdDto) {
    return this.activityLogsService.findOne(params.id);
  }

  @Delete('clean')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  cleanOldLogs(@Query('daysToKeep') daysToKeep?: string) {
    return this.activityLogsService.cleanOldLogs(
      daysToKeep ? parseInt(daysToKeep) : 90,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.activityLogsService.remove(params.id);
  }
}
