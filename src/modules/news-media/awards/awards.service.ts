import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Award } from '../../../database/schemas/cms/award.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class AwardsService {
  private readonly DEFAULT_IMAGE = '/uploads/defaults/nomow.png';

  constructor(
    @InjectModel(Award.name)
    private awardModel: Model<Award>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(
    createDto: CreateAwardDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<Award> {
    const award = new this.awardModel({
      ...createDto,
      image: file ? `/uploads/awards/${file.filename}` : this.DEFAULT_IMAGE,
      createdBy: userId,
    });
    const savedAward = await award.save();

    // Log activity
    await this.activityLogModel.create({
      userId: userId,
      action: 'created',
      entityType: 'Award',
      entityId: savedAward._id,
    });

    return savedAward;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Award>> {
    return PaginationHelper.paginate(
      this.awardModel,
      paginationDto,
      {},
      { awardDate: -1, order: 1 },
    );
  }

  async findActive(): Promise<Award[]> {
    return this.awardModel
      .find({ isActive: true })
      .sort({ awardDate: -1, order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Award> {
    const award = await this.awardModel.findById(id).exec();
    if (!award) {
      throw new NotFoundException(`Award with ID ${id} not found`);
    }
    return award;
  }

  async update(
    id: string,
    updateDto: UpdateAwardDto,
    userId?: string,
    file?: Express.Multer.File,
  ): Promise<Award> {
    const updateData = {
      ...updateDto,
      ...(file && { image: `/uploads/awards/${file.filename}` }),
    };

    const award = await this.awardModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!award) {
      throw new NotFoundException(`Award with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'updated',
        entityType: 'Award',
        entityId: id,
      });
    }

    return award;
  }

  async toggleActive(id: string): Promise<Award> {
    const award = await this.findOne(id);
    award.isActive = !award.isActive;
    return award.save();
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.awardModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Award with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'deleted',
        entityType: 'Award',
        entityId: id,
      });
    }
  }
}
