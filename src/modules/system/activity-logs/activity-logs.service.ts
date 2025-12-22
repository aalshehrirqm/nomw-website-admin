import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateActivityLogDto } from './dto/create-activity-log.dto';
import { QueryActivityLogDto } from './dto/query-activity-log.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ActivityLogsService {
  constructor(
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(
    createDto: CreateActivityLogDto,
    userId: string,
  ): Promise<ActivityLog> {
    const log = new this.activityLogModel({
      ...createDto,
      userId,
    });
    return log.save();
  }

  async log(
    userId: string,
    action: string,
    entityType: string,
    entityId?: string,
    changes?: any,
    metadata?: { ipAddress?: string; userAgent?: string },
  ): Promise<ActivityLog> {
    return this.create(
      {
        action,
        entityType,
        entityId,
        changes,
        ipAddress: metadata?.ipAddress,
        userAgent: metadata?.userAgent,
      },
      userId,
    );
  }

  async findAll(
    queryDto: QueryActivityLogDto,
  ): Promise<PaginationResponse<ActivityLog>> {
    const filter: FilterQuery<ActivityLog> = {};

    if (queryDto.userId) {
      filter.userId = queryDto.userId;
    }

    if (queryDto.action) {
      filter.action = { $regex: queryDto.action, $options: 'i' };
    }

    if (queryDto.entityType) {
      filter.entityType = queryDto.entityType;
    }

    if (queryDto.entityId) {
      filter.entityId = queryDto.entityId;
    }

    if (queryDto.startDate || queryDto.endDate) {
      filter.createdAt = {};
      if (queryDto.startDate) {
        filter.createdAt.$gte = queryDto.startDate;
      }
      if (queryDto.endDate) {
        filter.createdAt.$lte = queryDto.endDate;
      }
    }

    const result = await PaginationHelper.paginate(
      this.activityLogModel,
      queryDto,
      filter,
      { createdAt: -1 },
    );

    // Populate userId after pagination
    const populatedData = await this.activityLogModel.populate(result.data, {
      path: 'userId',
      select: 'name email',
    });

    return {
      ...result,
      data: populatedData,
    };
  }

  async findByUser(userId: string, limit: number = 50): Promise<ActivityLog[]> {
    return this.activityLogModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'name email')
      .exec();
  }

  async findByEntity(
    entityType: string,
    entityId: string,
  ): Promise<ActivityLog[]> {
    return this.activityLogModel
      .find({ entityType, entityId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .exec();
  }

  async findOne(id: string): Promise<ActivityLog> {
    const log = await this.activityLogModel
      .findById(id)
      .populate('userId', 'name email')
      .exec();
    if (!log) {
      throw new NotFoundException(`Activity log with ID ${id} not found`);
    }
    return log;
  }

  async remove(id: string): Promise<void> {
    const result = await this.activityLogModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Activity log with ID ${id} not found`);
    }
  }

  async getStats(startDate?: Date, endDate?: Date): Promise<any> {
    const match: any = {};
    if (startDate || endDate) {
      match.createdAt = {};
      if (startDate) match.createdAt.$gte = startDate;
      if (endDate) match.createdAt.$lte = endDate;
    }

    const totalLogs = await this.activityLogModel.countDocuments(match).exec();

    const byAction = await this.activityLogModel
      .aggregate([
        ...(Object.keys(match).length > 0 ? [{ $match: match }] : []),
        {
          $group: {
            _id: '$action',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .exec();

    const byEntityType = await this.activityLogModel
      .aggregate([
        ...(Object.keys(match).length > 0 ? [{ $match: match }] : []),
        {
          $group: {
            _id: '$entityType',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ])
      .exec();

    const topUsers = await this.activityLogModel
      .aggregate([
        ...(Object.keys(match).length > 0 ? [{ $match: match }] : []),
        {
          $group: {
            _id: '$userId',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ])
      .exec();

    return {
      totalLogs,
      byAction,
      byEntityType,
      topUsers,
    };
  }

  async cleanOldLogs(daysToKeep: number = 90): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const result = await this.activityLogModel
      .deleteMany({
        createdAt: { $lt: cutoffDate },
      })
      .exec();

    return result.deletedCount;
  }
}
