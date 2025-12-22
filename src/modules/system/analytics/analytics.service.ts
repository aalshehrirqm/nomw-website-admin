import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Analytics } from '../../../database/schemas/cms/analytics.schema';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { QueryAnalyticsDto } from './dto/query-analytics.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Analytics.name)
    private analyticsModel: Model<Analytics>,
  ) {}

  async create(createDto: CreateAnalyticsDto): Promise<Analytics> {
    const analytics = new this.analyticsModel(createDto);
    return analytics.save();
  }

  async trackPageView(
    page: string,
    path: string,
    metadata?: Partial<CreateAnalyticsDto>,
  ): Promise<Analytics> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existing = await this.analyticsModel
      .findOne({
        page,
        path,
        date: today,
      })
      .exec();

    if (existing) {
      existing.views += 1;
      return existing.save();
    }

    return this.create({
      page,
      path,
      date: today,
      views: 1,
      uniqueVisitors: 1,
      ...metadata,
    });
  }

  async findAll(
    queryDto: QueryAnalyticsDto,
  ): Promise<PaginationResponse<Analytics>> {
    const filter: FilterQuery<Analytics> = {};

    if (queryDto.pageName) {
      filter.page = { $regex: queryDto.pageName, $options: 'i' };
    }

    if (queryDto.path) {
      filter.path = queryDto.path;
    }

    if (queryDto.startDate || queryDto.endDate) {
      filter.date = {};
      if (queryDto.startDate) {
        filter.date.$gte = queryDto.startDate;
      }
      if (queryDto.endDate) {
        filter.date.$lte = queryDto.endDate;
      }
    }

    if (queryDto.country) {
      filter.country = queryDto.country;
    }

    return PaginationHelper.paginate(this.analyticsModel, queryDto, filter, {
      date: -1,
      views: -1,
    });
  }

  async findOne(id: string): Promise<Analytics> {
    const analytics = await this.analyticsModel.findById(id).exec();
    if (!analytics) {
      throw new NotFoundException(`Analytics record with ID ${id} not found`);
    }
    return analytics;
  }

  async remove(id: string): Promise<void> {
    const result = await this.analyticsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Analytics record with ID ${id} not found`);
    }
  }

  async getTopPages(
    limit: number = 10,
    startDate?: Date,
    endDate?: Date,
  ): Promise<any[]> {
    const match: any = {};
    if (startDate || endDate) {
      match.date = {};
      if (startDate) match.date.$gte = startDate;
      if (endDate) match.date.$lte = endDate;
    }

    return this.analyticsModel
      .aggregate([
        ...(Object.keys(match).length > 0 ? [{ $match: match }] : []),
        {
          $group: {
            _id: { page: '$page', path: '$path' },
            totalViews: { $sum: '$views' },
            totalUniqueVisitors: { $sum: '$uniqueVisitors' },
          },
        },
        { $sort: { totalViews: -1 } },
        { $limit: limit },
        {
          $project: {
            _id: 0,
            page: '$_id.page',
            path: '$_id.path',
            totalViews: 1,
            totalUniqueVisitors: 1,
          },
        },
      ])
      .exec();
  }

  async getDashboard(): Promise<any> {
    const now = new Date();
    const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Get stats for last 30 days
    const stats = await this.getStats(last30Days, now);

    // Get top pages
    const topPages = await this.getTopPages(5, last30Days, now);

    // Calculate percentages for top pages
    const totalViews = topPages.reduce((sum, page) => sum + page.totalViews, 0);
    const topPagesWithPercentage = topPages.map((page) => ({
      page: page.path || page.page,
      views: page.totalViews,
      percentage:
        totalViews > 0 ? Math.round((page.totalViews / totalViews) * 100) : 0,
    }));

    // Mock traffic sources (can be enhanced with real data)
    const trafficSources = [
      {
        source: 'Direct',
        visitors: Math.round(stats.totalUniqueVisitors * 0.4),
        percentage: 40,
      },
      {
        source: 'Google',
        visitors: Math.round(stats.totalUniqueVisitors * 0.3),
        percentage: 30,
      },
      {
        source: 'Social Media',
        visitors: Math.round(stats.totalUniqueVisitors * 0.2),
        percentage: 20,
      },
      {
        source: 'Referral',
        visitors: Math.round(stats.totalUniqueVisitors * 0.1),
        percentage: 10,
      },
    ];

    // Mock device types (can be enhanced with real data)
    const deviceTypes = [
      {
        device: 'Desktop',
        count: Math.round(stats.totalUniqueVisitors * 0.5),
        percentage: 50,
      },
      {
        device: 'Mobile',
        count: Math.round(stats.totalUniqueVisitors * 0.4),
        percentage: 40,
      },
      {
        device: 'Tablet',
        count: Math.round(stats.totalUniqueVisitors * 0.1),
        percentage: 10,
      },
    ];

    // Calculate bounce rate (mock for now)
    const bounceRate = 42.5;

    // Calculate average session duration (mock for now)
    const avgSessionDuration = '3:45';

    return {
      stats: {
        totalVisitors: stats.totalUniqueVisitors,
        pageViews: stats.totalViews,
        uniqueVisitors: stats.totalUniqueVisitors,
        bounceRate,
        avgSessionDuration,
      },
      topPages: topPagesWithPercentage,
      trafficSources,
      deviceTypes,
    };
  }

  async getStats(startDate?: Date, endDate?: Date): Promise<any> {
    const match: any = {};
    if (startDate || endDate) {
      match.date = {};
      if (startDate) match.date.$gte = startDate;
      if (endDate) match.date.$lte = endDate;
    }

    const stats = await this.analyticsModel
      .aggregate([
        ...(Object.keys(match).length > 0 ? [{ $match: match }] : []),
        {
          $group: {
            _id: null,
            totalViews: { $sum: '$views' },
            totalUniqueVisitors: { $sum: '$uniqueVisitors' },
            avgViews: { $avg: '$views' },
          },
        },
      ])
      .exec();

    const byCountry = await this.analyticsModel
      .aggregate([
        ...(Object.keys(match).length > 0 ? [{ $match: match }] : []),
        { $match: { country: { $exists: true, $ne: null } } },
        {
          $group: {
            _id: '$country',
            views: { $sum: '$views' },
          },
        },
        { $sort: { views: -1 } },
        { $limit: 10 },
      ])
      .exec();

    return {
      totalViews: stats[0]?.totalViews || 0,
      totalUniqueVisitors: stats[0]?.totalUniqueVisitors || 0,
      avgViews: stats[0]?.avgViews || 0,
      topCountries: byCountry,
    };
  }

  async getViewsByDate(startDate: Date, endDate: Date): Promise<any[]> {
    return this.analyticsModel
      .aggregate([
        {
          $match: {
            date: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $group: {
            _id: '$date',
            views: { $sum: '$views' },
            uniqueVisitors: { $sum: '$uniqueVisitors' },
          },
        },
        { $sort: { _id: 1 } },
        {
          $project: {
            _id: 0,
            date: '$_id',
            views: 1,
            uniqueVisitors: 1,
          },
        },
      ])
      .exec();
  }
}
