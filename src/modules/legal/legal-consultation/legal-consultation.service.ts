import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LegalConsultationItem } from 'src/database/schemas/cms/legal-consultation-item.schema';
import { CreateLegalConsultationItemDto } from './dto/create-legal-consultation-item.dto';
import { UpdateLegalConsultationItemDto } from './dto/update-legal-consultation-item.dto';

@Injectable()
export class LegalConsultationService {
  constructor(
    @InjectModel(LegalConsultationItem.name)
    private itemModel: Model<LegalConsultationItem>,
  ) {}

  async create(
    createDto: CreateLegalConsultationItemDto,
  ): Promise<LegalConsultationItem> {
    const item = new this.itemModel(createDto);
    return item.save();
  }

  async findAll(): Promise<LegalConsultationItem[]> {
    return this.itemModel.find().sort({ order: 1 }).exec();
  }

  async findActive(): Promise<LegalConsultationItem[]> {
    return this.itemModel.find({ isActive: true }).sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<LegalConsultationItem> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(
    id: string,
    updateDto: UpdateLegalConsultationItemDto,
  ): Promise<LegalConsultationItem> {
    const item = await this.itemModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async remove(id: string): Promise<void> {
    const result = await this.itemModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }

  async toggleActive(id: string): Promise<LegalConsultationItem> {
    const item = await this.findOne(id);
    item.isActive = !item.isActive;
    return item.save();
  }
}
