import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CeoWords } from '../../../database/schemas/cms/ceo-words.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateCeoWordsDto } from './dto/create-ceo-words.dto';
import { UpdateCeoWordsDto } from './dto/update-ceo-words.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class CeoWordsService {
  private readonly DEFAULT_IMAGE = '/uploads/defaults/nomow.png';

  constructor(
    @InjectModel(CeoWords.name)
    private ceoWordsModel: Model<CeoWords>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(
    createDto: CreateCeoWordsDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<CeoWords> {
    const ceoWords = new this.ceoWordsModel({
      ...createDto,
      image: file ? `/uploads/ceo-words/${file.filename}` : this.DEFAULT_IMAGE,
      createdBy: userId,
    });
    const saved = await ceoWords.save();

    await this.activityLogModel.create({
      userId,
      action: 'created',
      entityType: 'CeoWords',
      entityId: saved._id,
    });

    return saved;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<CeoWords>> {
    return PaginationHelper.paginate(
      this.ceoWordsModel,
      paginationDto,
      {},
      { createdAt: -1 },
    );
  }

  async findActive(): Promise<CeoWords | null> {
    return this.ceoWordsModel.findOne({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<CeoWords> {
    const ceoWords = await this.ceoWordsModel.findById(id).exec();
    if (!ceoWords) {
      throw new NotFoundException(`CEO words with ID ${id} not found`);
    }
    return ceoWords;
  }

  async update(
    id: string,
    updateDto: UpdateCeoWordsDto,
    userId?: string,
    file?: Express.Multer.File,
  ): Promise<CeoWords> {
    const updateData = {
      ...updateDto,
      ...(file && { image: `/uploads/ceo-words/${file.filename}` }),
    };

    const ceoWords = await this.ceoWordsModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!ceoWords) {
      throw new NotFoundException(`CEO words with ID ${id} not found`);
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'updated',
        entityType: 'CeoWords',
        entityId: id,
      });
    }

    return ceoWords;
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.ceoWordsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`CEO words with ID ${id} not found`);
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'deleted',
        entityType: 'CeoWords',
        entityId: id,
      });
    }
  }

  async toggleActive(id: string): Promise<CeoWords> {
    const ceoWords = await this.findOne(id);
    ceoWords.isActive = !ceoWords.isActive;
    return ceoWords.save();
  }
}
