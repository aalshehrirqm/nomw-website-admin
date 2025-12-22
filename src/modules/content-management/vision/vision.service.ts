import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vision } from '../../../database/schemas/cms/vision.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateVisionDto } from './dto/create-vision.dto';
import { UpdateVisionDto } from './dto/update-vision.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class VisionService {
  constructor(
    @InjectModel(Vision.name)
    private visionModel: Model<Vision>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(createDto: CreateVisionDto, userId: string): Promise<Vision> {
    const vision = new this.visionModel({
      ...createDto,
      createdBy: userId,
    });
    const savedVision = await vision.save();

    // Log activity
    await this.activityLogModel.create({
      userId: userId,
      action: 'created',
      entityType: 'Vision',
      entityId: savedVision._id,
    });

    return savedVision;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Vision>> {
    return PaginationHelper.paginate(
      this.visionModel,
      paginationDto,
      {},
      { createdAt: -1 },
    );
  }

  async findActive(): Promise<Vision | null> {
    return this.visionModel.findOne({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<Vision> {
    const vision = await this.visionModel.findById(id).exec();
    if (!vision) {
      throw new NotFoundException(`Vision with ID ${id} not found`);
    }
    return vision;
  }

  async update(id: string, updateDto: UpdateVisionDto, userId?: string): Promise<Vision> {
    const vision = await this.visionModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!vision) {
      throw new NotFoundException(`Vision with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'updated',
        entityType: 'Vision',
        entityId: id,
      });
    }

    return vision;
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.visionModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Vision with ID ${id} not found`);
    }

    // Log activity
    if (userId) {
      await this.activityLogModel.create({
        userId: userId,
        action: 'deleted',
        entityType: 'Vision',
        entityId: id,
      });
    }
  }

  async toggleActive(id: string): Promise<Vision> {
    const vision = await this.findOne(id);
    vision.isActive = !vision.isActive;
    return vision.save();
  }
}
