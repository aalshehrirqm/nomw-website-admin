import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from '../../database/schemas/cms/news.schema';
import { User } from '../../database/schemas/user.schema';
import { Award } from '../../database/schemas/cms/award.schema';
import { PeriodicReport } from '../../database/schemas/cms/periodic-report.schema';
import { ActivityLog } from '../../database/schemas/cms/activity-log.schema';
import { MediaService } from '../system/media/media.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import * as os from 'os';
export class DashboardService {
  constructor(
    @InjectModel(News.name) private newsModel: Model<News>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Award.name) private awardModel: Model<Award>,
    @InjectModel(PeriodicReport.name)
    private reportModel: Model<PeriodicReport>,
    @InjectModel(ActivityLog.name) private activityLogModel: Model<ActivityLog>,
    private readonly mediaService: MediaService,
    @InjectConnection() private connection: Connection,
  ) { }

  async getSystemStatus() {
    // Server Status
    const serverStatus = {
      status: 'connected',
      uptime: process.uptime(),
    };

    // Database Status
    const dbState = this.connection.readyState;
    const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

    // Storage Usage
    const mediaStats = await this.mediaService.getStats();
    const usedStorage = mediaStats.totalSize;
    const totalStorage = 100 * 1024 * 1024 * 1024; // 100 GB in bytes

    // Memory Usage
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;

    // Backup Status
    const backupStatus = {
      lastBackup: null, // "Not Configured"
    };

    return {
      server: serverStatus,
      database: { status: dbStatus },
      storage: {
        used: usedStorage,
        total: totalStorage,
      },
      memory: {
        used: usedMemory,
        total: totalMemory,
      },
      backup: backupStatus,
    };
  }

  async getStats() {
    // Get current month start date
    const now = new Date();
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

    // Count total news
    const totalNews = await this.newsModel.countDocuments();

    // Count news from last month
    const lastMonthNews = await this.newsModel.countDocuments({
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
    });

    // Count news from current month
    const currentMonthNews = await this.newsModel.countDocuments({
      createdAt: { $gte: currentMonthStart },
    });

    // Calculate news change percentage
    const newsChange =
      lastMonthNews > 0
        ? `+${Math.round((currentMonthNews / lastMonthNews) * 100)}%`
        : '+0%';

    // Count active users (users who logged in within last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await this.userModel.countDocuments({
      lastLogin: { $gte: thirtyDaysAgo },
    });

    // Count total awards
    const totalAwards = await this.awardModel.countDocuments();

    // Count awards from last month
    const lastMonthAwards = await this.awardModel.countDocuments({
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
    });

    // Count awards from current month
    const currentMonthAwards = await this.awardModel.countDocuments({
      createdAt: { $gte: currentMonthStart },
    });

    // Calculate awards change
    const awardsChange =
      currentMonthAwards > lastMonthAwards
        ? `+${currentMonthAwards - lastMonthAwards}`
        : `${currentMonthAwards - lastMonthAwards}`;

    // Count total reports
    const totalReports = await this.reportModel.countDocuments();

    // Count reports from last month
    const lastMonthReports = await this.reportModel.countDocuments({
      createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd },
    });

    // Count reports from current month
    const currentMonthReports = await this.reportModel.countDocuments({
      createdAt: { $gte: currentMonthStart },
    });

    // Calculate reports change percentage
    const reportsChange =
      lastMonthReports > 0
        ? `+${Math.round((currentMonthReports / lastMonthReports) * 100)}%`
        : '+0%';

    return {
      totalNews,
      activeUsers,
      awards: totalAwards,
      reports: totalReports,
      newsChange,
      usersChange: '+5%',
      awardsChange,
      reportsChange,
    };
  }

  async getRecentActivities(limit: number = 10) {
    const activities = await this.activityLogModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'name email')
      .lean();

    return activities.map((activity: any) => ({
      user: activity.userId?.name || 'Unknown User',
      action: activity.action,
      item: activity.entityType || '',
      time: activity.createdAt, // Return actual timestamp for client-side formatting
      avatar: activity.userId?.name?.charAt(0) || 'U',
    }));
  }

  private getTimeAgo(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - new Date(date).getTime();
    const diffInMinutes = Math.floor(diffInMs / 60000);

    if (diffInMinutes < 1) return 'منذ لحظات';
    if (diffInMinutes < 60) return `منذ ${diffInMinutes} دقيقة`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `منذ ${diffInHours} ساعة`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `منذ ${diffInDays} يوم`;
  }
}
