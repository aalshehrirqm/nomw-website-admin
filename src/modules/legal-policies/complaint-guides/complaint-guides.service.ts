import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ComplaintGuide } from '../../../database/schemas/cms/complaint-guide.schema';
import { CreateComplaintGuideDto } from './dto/create-complaint-guide.dto';
import { UpdateComplaintGuideDto } from './dto/update-complaint-guide.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ComplaintGuidesService {
  constructor(
    @InjectModel(ComplaintGuide.name)
    private complaintGuideModel: Model<ComplaintGuide>,
  ) {}

  async create(
    createDto: CreateComplaintGuideDto,
    userId: string,
  ): Promise<ComplaintGuide> {
    const guide = new this.complaintGuideModel({
      ...createDto,
      createdBy: userId,
    });
    return guide.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<ComplaintGuide>> {
    return PaginationHelper.paginate(
      this.complaintGuideModel,
      paginationDto,
      {},
      { createdAt: -1 },
    );
  }

  async findActive(): Promise<ComplaintGuide[]> {
    return this.complaintGuideModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<ComplaintGuide> {
    const guide = await this.complaintGuideModel.findById(id).exec();
    if (!guide) {
      throw new NotFoundException(`Complaint Guide with ID ${id} not found`);
    }
    return guide;
  }

  async update(
    id: string,
    updateDto: UpdateComplaintGuideDto,
  ): Promise<ComplaintGuide> {
    const guide = await this.complaintGuideModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!guide) {
      throw new NotFoundException(`Complaint Guide with ID ${id} not found`);
    }
    return guide;
  }

  async toggleActive(id: string): Promise<ComplaintGuide> {
    const guide = await this.findOne(id);
    guide.isActive = !guide.isActive;
    return guide.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.complaintGuideModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Complaint Guide with ID ${id} not found`);
    }
  }
}
