import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { PeriodicReport } from '../../../database/schemas/cms/periodic-report.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreatePeriodicReportDto } from './dto/create-periodic-report.dto';
import { UpdatePeriodicReportDto } from './dto/update-periodic-report.dto';
import { QueryPeriodicReportDto } from './dto/query-periodic-report.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class PeriodicReportsService {
  private readonly DEFAULT_IMAGE = '/uploads/defaults/nomow.png';

  constructor(
    @InjectModel(PeriodicReport.name)
    private periodicReportModel: Model<PeriodicReport>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(
    createDto: CreatePeriodicReportDto,
    userId: string,
  ): Promise<PeriodicReport> {
    const report = new this.periodicReportModel({
      ...createDto,
      thumbnailImage: createDto.thumbnailImage || this.DEFAULT_IMAGE,
      createdBy: userId,
    });
    const savedReport = await report.save();

    // Log activity
    await this.activityLogModel.create({
      userId: userId,
      action: 'created',
      entityType: 'PeriodicReport',
      entityId: savedReport._id,
    });

    return savedReport;
  }

  async findAll(
    queryDto: QueryPeriodicReportDto,
  ): Promise<PaginationResponse<PeriodicReport>> {
    const filter: FilterQuery<PeriodicReport> = {};

    if (queryDto.type) {
      filter.type = queryDto.type;
    }

    if (queryDto.year) {
      filter.year = queryDto.year;
    }

    if (queryDto.quarter) {
      filter.quarter = queryDto.quarter;
    }

    return PaginationHelper.paginate(
      this.periodicReportModel,
      queryDto,
      filter,
      { year: -1, quarter: -1, publishDate: -1 },
    );
  }

  async findActive(
    queryDto: QueryPeriodicReportDto,
  ): Promise<PaginationResponse<PeriodicReport>> {
    return this.findAll({ ...queryDto, isActive: true } as any);
  }

  async findByType(
    type: string,
    queryDto: QueryPeriodicReportDto,
  ): Promise<PaginationResponse<PeriodicReport>> {
    return this.findAll({ ...queryDto, type } as any);
  }

  async findOne(id: string): Promise<PeriodicReport> {
    const report = await this.periodicReportModel.findById(id).exec();
    if (!report) {
      throw new NotFoundException(`Periodic Report with ID ${id} not found`);
    }
    return report;
  }

  async update(
    id: string,
    updateDto: UpdatePeriodicReportDto,
    userId?: string,
  ): Promise<PeriodicReport> {
    const report = await this.periodicReportModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!report) {
      throw new NotFoundException(`Periodic Report with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'updated',
        entityType: 'PeriodicReport',
        entityId: id,
      });
    }

    return report;
  }

  async toggleActive(id: string): Promise<PeriodicReport> {
    const report = await this.findOne(id);
    report.isActive = !report.isActive;
    return report.save();
  }

  async incrementDownloadCount(id: string): Promise<void> {
    await this.periodicReportModel
      .findByIdAndUpdate(id, { $inc: { downloadCount: 1 } })
      .exec();
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.periodicReportModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Periodic Report with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'deleted',
        entityType: 'PeriodicReport',
        entityId: id,
      });
    }
  }

  async bulkDelete(ids: string[]): Promise<{ deleted: number }> {
    const result = await this.periodicReportModel
      .deleteMany({ _id: { $in: ids } })
      .exec();
    return { deleted: result.deletedCount };
  }
}
