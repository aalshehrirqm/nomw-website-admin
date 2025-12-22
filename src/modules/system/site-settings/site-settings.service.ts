import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { SiteSetting } from '../../../database/schemas/cms/site-setting.schema';
import { CreateSiteSettingDto } from './dto/create-site-setting.dto';
import { UpdateSiteSettingDto } from './dto/update-site-setting.dto';
import { QuerySiteSettingDto } from './dto/query-site-setting.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class SiteSettingsService {
  constructor(
    @InjectModel(SiteSetting.name)
    private siteSettingModel: Model<SiteSetting>,
  ) {}

  async create(
    createDto: CreateSiteSettingDto,
    userId: string,
  ): Promise<SiteSetting> {
    const existing = await this.siteSettingModel
      .findOne({ key: createDto.key })
      .exec();
    if (existing) {
      throw new ConflictException(
        `Setting with key '${createDto.key}' already exists`,
      );
    }

    const setting = new this.siteSettingModel({
      ...createDto,
      updatedBy: userId,
    });
    return setting.save();
  }

  async findAll(
    queryDto: QuerySiteSettingDto,
  ): Promise<PaginationResponse<SiteSetting>> {
    const filter: FilterQuery<SiteSetting> = {};

    if (queryDto.category) {
      filter.category = queryDto.category;
    }

    if (queryDto.key) {
      filter.key = { $regex: queryDto.key, $options: 'i' };
    }

    return PaginationHelper.paginate(this.siteSettingModel, queryDto, filter, {
      category: 1,
      key: 1,
    });
  }

  async findByCategory(category: string): Promise<SiteSetting[]> {
    return this.siteSettingModel.find({ category }).sort({ key: 1 }).exec();
  }

  async findByKey(key: string): Promise<SiteSetting> {
    const setting = await this.siteSettingModel.findOne({ key }).exec();
    if (!setting) {
      throw new NotFoundException(`Setting with key '${key}' not found`);
    }
    return setting;
  }

  async findOne(id: string): Promise<SiteSetting> {
    const setting = await this.siteSettingModel.findById(id).exec();
    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }
    return setting;
  }

  async update(
    id: string,
    updateDto: UpdateSiteSettingDto,
    userId: string,
  ): Promise<SiteSetting> {
    const setting = await this.siteSettingModel
      .findByIdAndUpdate(id, { ...updateDto, updatedBy: userId }, { new: true })
      .exec();
    if (!setting) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }
    return setting;
  }

  async updateByKey(
    key: string,
    value: any,
    userId: string,
  ): Promise<SiteSetting> {
    const setting = await this.siteSettingModel
      .findOneAndUpdate({ key }, { value, updatedBy: userId }, { new: true })
      .exec();
    if (!setting) {
      throw new NotFoundException(`Setting with key '${key}' not found`);
    }
    return setting;
  }

  async remove(id: string): Promise<void> {
    const result = await this.siteSettingModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Setting with ID ${id} not found`);
    }
  }

  async getAllAsObject(): Promise<Record<string, any>> {
    const settings = await this.siteSettingModel.find().exec();
    return settings.reduce(
      (acc, setting) => {
        acc[setting.key] = setting.value;
        return acc;
      },
      {} as Record<string, any>,
    );
  }
}
