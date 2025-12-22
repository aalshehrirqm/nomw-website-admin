import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MarqueeWarning } from 'src/database/schemas/cms/marquee-warning.schema';
import { ActivityLog } from 'src/database/schemas/cms/activity-log.schema';
import { CreateMarqueeWarningDto } from './dto/create-marquee-warning.dto';
import { UpdateMarqueeWarningDto } from './dto/update-marquee-warning.dto';

@Injectable()
export class MarqueeWarningService {
  constructor(
    @InjectModel(MarqueeWarning.name)
    private marqueeWarningModel: Model<MarqueeWarning>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(
    createDto: CreateMarqueeWarningDto,
    userId: string,
  ): Promise<MarqueeWarning> {
    const marqueeWarning = new this.marqueeWarningModel({
      ...createDto,
      createdBy: userId,
    });
    const saved = await marqueeWarning.save();

    await this.activityLogModel.create({
      userId,
      action: 'created',
      entityType: 'MarqueeWarning',
      entityId: saved._id,
    });

    return saved;
  }

  async findAll(): Promise<MarqueeWarning[]> {
    return this.marqueeWarningModel.find().sort({ createdAt: -1 }).exec();
  }

  async findActive(): Promise<MarqueeWarning | null> {
    return this.marqueeWarningModel
      .findOne({ isActive: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<MarqueeWarning> {
    const marqueeWarning = await this.marqueeWarningModel.findById(id).exec();
    if (!marqueeWarning) {
      throw new NotFoundException(`Marquee warning with ID ${id} not found`);
    }
    return marqueeWarning;
  }

  async update(
    id: string,
    updateDto: UpdateMarqueeWarningDto,
    userId?: string,
  ): Promise<MarqueeWarning> {
    const marqueeWarning = await this.marqueeWarningModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!marqueeWarning) {
      throw new NotFoundException(`Marquee warning with ID ${id} not found`);
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'updated',
        entityType: 'MarqueeWarning',
        entityId: id,
      });
    }

    return marqueeWarning;
  }

  async toggleActive(id: string): Promise<MarqueeWarning> {
    const marqueeWarning = await this.findOne(id);

    // If activating this one, deactivate all others
    if (!marqueeWarning.isActive) {
      await this.marqueeWarningModel.updateMany({}, { isActive: false });
    }

    marqueeWarning.isActive = !marqueeWarning.isActive;
    return marqueeWarning.save();
  }

  async delete(id: string, userId?: string): Promise<void> {
    const result = await this.marqueeWarningModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Marquee warning with ID ${id} not found`);
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'deleted',
        entityType: 'MarqueeWarning',
        entityId: id,
      });
    }
  }
}
