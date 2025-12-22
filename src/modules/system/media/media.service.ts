import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Media } from '../../../database/schemas/cms/media.schema';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { QueryMediaDto } from './dto/query-media.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media.name)
    private mediaModel: Model<Media>,
  ) {}

  async create(createDto: CreateMediaDto, userId: string): Promise<Media> {
    const media = new this.mediaModel({
      ...createDto,
      uploadedBy: userId,
    });
    return media.save();
  }

  async findAll(queryDto: QueryMediaDto): Promise<PaginationResponse<Media>> {
    const filter: FilterQuery<Media> = {};

    if (queryDto.category) {
      filter.category = queryDto.category;
    }

    if (queryDto.entityType) {
      filter.entityType = queryDto.entityType;
    }

    if (queryDto.entityId) {
      filter.entityId = queryDto.entityId;
    }

    if (queryDto.mimeType) {
      filter.mimeType = { $regex: queryDto.mimeType, $options: 'i' };
    }

    return PaginationHelper.paginate(this.mediaModel, queryDto, filter, {
      createdAt: -1,
    });
  }

  async findByCategory(category: string): Promise<Media[]> {
    return this.mediaModel.find({ category }).sort({ createdAt: -1 }).exec();
  }

  async findByEntity(entityType: string, entityId: string): Promise<Media[]> {
    return this.mediaModel
      .find({ entityType, entityId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Media> {
    const media = await this.mediaModel.findById(id).exec();
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async update(id: string, updateDto: UpdateMediaDto): Promise<Media> {
    const media = await this.mediaModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!media) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
    return media;
  }

  async remove(id: string): Promise<void> {
    const result = await this.mediaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Media with ID ${id} not found`);
    }
  }

  async getStats(): Promise<any> {
    const totalFiles = await this.mediaModel.countDocuments().exec();
    const totalSize = await this.mediaModel
      .aggregate([{ $group: { _id: null, total: { $sum: '$size' } } }])
      .exec();

    const byCategory = await this.mediaModel
      .aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 },
            size: { $sum: '$size' },
          },
        },
        { $sort: { count: -1 } },
      ])
      .exec();

    const byMimeType = await this.mediaModel
      .aggregate([
        { $group: { _id: '$mimeType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .exec();

    return {
      totalFiles,
      totalSize: totalSize[0]?.total || 0,
      byCategory,
      byMimeType,
    };
  }
}
