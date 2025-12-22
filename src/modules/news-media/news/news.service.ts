import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { News } from '../../../database/schemas/cms/news.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class NewsService {
  private readonly DEFAULT_IMAGE = '/uploads/defaults/nomow.png';
  private readonly PREVIEW_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  // In-memory preview storage: Map<previewId, {data, expiresAt}>
  private previews = new Map<string, { data: any; expiresAt: number }>();

  constructor(
    @InjectModel(News.name)
    private newsModel: Model<News>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(createDto: CreateNewsDto, userId: string): Promise<News> {
    const news = new this.newsModel({
      ...createDto,
      image: createDto.image || this.DEFAULT_IMAGE,
      createdBy: userId,
    });
    const savedNews = await news.save();
    const populated = await this.newsModel
      .findById(savedNews._id)
      .populate('createdBy', 'name email role')
      .exec();

    if (!populated) {
      throw new NotFoundException('Failed to create news');
    }

    // Log activity
    await this.activityLogModel.create({
      userId: userId,
      action: 'created',
      entityType: 'News',
      entityId: savedNews._id,
    });

    return populated;
  }

  async findAll(queryDto: QueryNewsDto): Promise<PaginationResponse<News>> {
    const filter: FilterQuery<News> = {};

    if (queryDto.category) {
      filter.$or = [
        { 'category.ar': queryDto.category },
        { 'category.en': queryDto.category },
      ];
    }

    if (queryDto.isPublished !== undefined) {
      filter.isPublished = queryDto.isPublished;
    }

    if (queryDto.search) {
      filter.$or = [
        { 'title.ar': { $regex: queryDto.search, $options: 'i' } },
        { 'title.en': { $regex: queryDto.search, $options: 'i' } },
        { 'excerpt.ar': { $regex: queryDto.search, $options: 'i' } },
        { 'excerpt.en': { $regex: queryDto.search, $options: 'i' } },
      ];
    }

    return PaginationHelper.paginate(
      this.newsModel,
      queryDto,
      filter,
      { publishDate: -1, createdAt: -1 },
      'createdBy',
      'name email role',
    );
  }

  async findPublished(
    queryDto: QueryNewsDto,
  ): Promise<PaginationResponse<News>> {
    return this.findAll({ ...queryDto, isPublished: true });
  }

  async findBySlug(slug: string): Promise<News> {
    const news = await this.newsModel
      .findOne({ slug })
      .populate('createdBy', 'name email role')
      .exec();
    if (!news) {
      throw new NotFoundException(`News with slug ${slug} not found`);
    }
    return news;
  }

  async findOne(id: string): Promise<News> {
    const news = await this.newsModel
      .findById(id)
      .populate('createdBy', 'name email role')
      .exec();
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }
    return news;
  }

  async update(
    id: string,
    updateDto: UpdateNewsDto,
    userId?: string,
  ): Promise<News> {
    const news = await this.newsModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .populate('createdBy', 'name email role')
      .exec();
    if (!news) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'updated',
        entityType: 'News',
        entityId: id,
      });
    }

    return news;
  }

  async togglePublish(id: string): Promise<News> {
    const news = await this.findOne(id);
    news.isPublished = !news.isPublished;
    return news.save();
  }

  async incrementViews(id: string): Promise<void> {
    await this.newsModel.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.newsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`News with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'deleted',
        entityType: 'News',
        entityId: id,
      });
    }
  }

  // ========== Preview Methods ==========

  /**
   * Create a temporary preview and return preview ID
   */
  createPreview(previewData: any): string {
    // Generate unique preview ID
    const previewId = `preview_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store preview with expiration time
    this.previews.set(previewId, {
      data: previewData,
      expiresAt: Date.now() + this.PREVIEW_TTL,
    });

    // Cleanup old previews
    this.cleanupExpiredPreviews();

    return previewId;
  }

  /**
   * Get preview data by ID
   */
  getPreview(previewId: string): any {
    const preview = this.previews.get(previewId);

    if (!preview) {
      throw new NotFoundException('Preview not found or expired');
    }

    // Check if expired
    if (Date.now() > preview.expiresAt) {
      this.previews.delete(previewId);
      throw new NotFoundException('Preview expired');
    }

    return preview.data;
  }

  /**
   * Remove expired previews from memory
   */
  private cleanupExpiredPreviews(): void {
    const now = Date.now();
    for (const [id, preview] of this.previews.entries()) {
      if (now > preview.expiresAt) {
        this.previews.delete(id);
      }
    }
  }
}
