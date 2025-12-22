import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HeroSection } from '../../../database/schemas/cms/hero-section.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class HeroSectionService {
  private readonly DEFAULT_IMAGE = '/uploads/defaults/nomow.png';

  constructor(
    @InjectModel(HeroSection.name)
    private heroSectionModel: Model<HeroSection>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(
    createDto: CreateHeroSectionDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<HeroSection> {
    const data: any = {
      ...createDto,
      createdBy: userId,
    };

    if (file) {
      data.backgroundImage = `/uploads/hero-sections/${file.filename}`;
    } else {
      data.backgroundImage = this.DEFAULT_IMAGE;
    }

    const heroSection = new this.heroSectionModel(data);
    const savedSection = await heroSection.save();

    // Log activity
    await this.activityLogModel.create({
      userId: userId,
      action: 'created',
      entityType: 'HeroSection',
      entityId: savedSection._id,
    });

    return savedSection;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<HeroSection>> {
    return PaginationHelper.paginate(
      this.heroSectionModel,
      paginationDto,
      {},
      { order: 1, createdAt: -1 },
    );
  }

  async findActive(): Promise<HeroSection[]> {
    return this.heroSectionModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<HeroSection> {
    const heroSection = await this.heroSectionModel.findById(id).exec();
    if (!heroSection) {
      throw new NotFoundException(`Hero section with ID ${id} not found`);
    }
    return heroSection;
  }

  async update(
    id: string,
    updateDto: UpdateHeroSectionDto,
    userId?: string,
    file?: Express.Multer.File,
  ): Promise<HeroSection> {
    const data: any = { ...updateDto };

    if (file) {
      data.backgroundImage = `/uploads/hero-sections/${file.filename}`;
    }

    const heroSection = await this.heroSectionModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!heroSection) {
      throw new NotFoundException(`Hero section with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'updated',
        entityType: 'HeroSection',
        entityId: id,
      });
    }

    return heroSection;
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.heroSectionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Hero section with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'deleted',
        entityType: 'HeroSection',
        entityId: id,
      });
    }
  }

  async toggleActive(id: string): Promise<HeroSection> {
    const heroSection = await this.findOne(id);
    heroSection.isActive = !heroSection.isActive;
    return heroSection.save();
  }
}
