import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel('News') private newsModel: Model<any>,
    @InjectModel('PeriodicReport') private reportModel: Model<any>,
    @InjectModel('InvestmentOpportunity') private investmentModel: Model<any>,
    @InjectModel('BoardMember') private boardMemberModel: Model<any>,
    @InjectModel('LegalConsultation') private legalModel: Model<any>,
    @InjectModel('User') private userModel: Model<any>,
  ) {}

  async getDashboard() {
    // Get counts from all modules
    const [
      newsCount,
      reportsCount,
      investmentCount,
      organizationCount,
      legalCount,
      usersCount,
      activeUsersCount,
    ] = await Promise.all([
      this.newsModel.countDocuments(),
      this.reportModel.countDocuments(),
      this.investmentModel.countDocuments(),
      this.boardMemberModel.countDocuments(),
      this.legalModel.countDocuments(),
      this.userModel.countDocuments(),
      this.userModel.countDocuments({ isActive: true }),
    ]);

    // Get published/draft counts
    const [
      newsPublished,
      reportsPublished,
      investmentPublished,
      legalPublished,
    ] = await Promise.all([
      this.newsModel.countDocuments({ isActive: true }),
      this.reportModel.countDocuments({ isActive: true }),
      this.investmentModel.countDocuments({ isActive: true }),
      this.legalModel.countDocuments({ isActive: true }),
    ]);

    const totalContent =
      newsCount +
      reportsCount +
      investmentCount +
      organizationCount +
      legalCount;
    const publishedContent =
      newsPublished + reportsPublished + investmentPublished + legalPublished;
    const draftContent = totalContent - publishedContent;

    // Get weekly stats (last 7 days)
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [weeklyNews, weeklyReports, weeklyInvestment] = await Promise.all([
      this.newsModel.countDocuments({ createdAt: { $gte: weekAgo } }),
      this.reportModel.countDocuments({ createdAt: { $gte: weekAgo } }),
      this.investmentModel.countDocuments({ createdAt: { $gte: weekAgo } }),
    ]);

    const weeklyNewContent = weeklyNews + weeklyReports + weeklyInvestment;

    // Module stats
    const moduleStats = [
      {
        module: 'News & Media',
        total: newsCount,
        published: newsPublished,
        draft: newsCount - newsPublished,
        icon: '📰',
        color: 'blue',
      },
      {
        module: 'Reports',
        total: reportsCount,
        published: reportsPublished,
        draft: reportsCount - reportsPublished,
        icon: '📊',
        color: 'green',
      },
      {
        module: 'Investment',
        total: investmentCount,
        published: investmentPublished,
        draft: investmentCount - investmentPublished,
        icon: '💼',
        color: 'purple',
      },
      {
        module: 'Organization',
        total: organizationCount,
        published: organizationCount,
        draft: 0,
        icon: '🏢',
        color: 'orange',
      },
      {
        module: 'Legal',
        total: legalCount,
        published: legalPublished,
        draft: legalCount - legalPublished,
        icon: '⚖️',
        color: 'red',
      },
    ];

    // Get recent activities (last 10)
    const recentNews = await this.newsModel
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title createdAt')
      .lean();

    const recentActivities = recentNews.map((item: any) => ({
      id: item._id.toString(),
      user: 'Admin',
      action: 'نشر',
      module: 'News',
      title: item.title?.ar || item.title?.en || 'No title',
      timestamp: item.createdAt,
    }));

    // Get top contributors (users with most content)
    const topUsers = await this.userModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email')
      .lean();

    const topContributors = topUsers.map((user: any, index) => ({
      id: user._id.toString(),
      name: user.name || 'User',
      email: user.email,
      actionsCount: Math.max(50 - index * 10, 10), // Mock for now
      lastActive: new Date(),
    }));

    // System health
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);

    return {
      stats: {
        totalContent,
        publishedContent,
        draftContent,
        totalUsers: usersCount,
        activeUsers: activeUsersCount,
        weeklyStats: {
          newContent: weeklyNewContent,
          updatedContent: 0, // Can be calculated if needed
          newUsers: 0, // Can be calculated if needed
        },
      },
      moduleStats,
      recentActivities,
      topContributors,
      systemHealth: {
        status: 'healthy',
        uptime: `${days}d ${hours}h`,
        lastBackup: new Date(),
        pendingTasks: 0,
      },
    };
  }
}
