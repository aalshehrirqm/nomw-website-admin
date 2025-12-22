import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  Complaint,
  ComplaintStatus,
} from '../../../database/schemas/cms/complaint.schema';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { QueryComplaintDto } from './dto/query-complaint.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<Complaint>,
  ) {}

  private generateReferenceNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `CMP-${timestamp}-${random}`;
  }

  async create(createDto: CreateComplaintDto): Promise<Complaint> {
    const referenceNumber = this.generateReferenceNumber();
    const complaint = new this.complaintModel({
      ...createDto,
      referenceNumber,
    });
    return complaint.save();
  }

  async findAll(
    queryDto: QueryComplaintDto,
  ): Promise<PaginationResponse<Complaint>> {
    const filter: FilterQuery<Complaint> = {};

    if (queryDto.status) {
      filter.status = queryDto.status;
    }

    if (queryDto.complaintType) {
      filter.complaintType = queryDto.complaintType;
    }

    if (queryDto.referenceNumber) {
      filter.referenceNumber = queryDto.referenceNumber;
    }

    return PaginationHelper.paginate(this.complaintModel, queryDto, filter, {
      createdAt: -1,
    });
  }

  async findByReferenceNumber(referenceNumber: string): Promise<Complaint> {
    const complaint = await this.complaintModel
      .findOne({ referenceNumber })
      .exec();
    if (!complaint) {
      throw new NotFoundException(
        `Complaint with reference number ${referenceNumber} not found`,
      );
    }
    return complaint;
  }

  async findOne(id: string): Promise<Complaint> {
    const complaint = await this.complaintModel.findById(id).exec();
    if (!complaint) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
    return complaint;
  }

  async update(
    id: string,
    updateDto: UpdateComplaintDto,
    userId?: string,
  ): Promise<Complaint> {
    const updateData: any = { ...updateDto };

    if (updateDto.response && userId) {
      updateData.respondedBy = userId;
      updateData.respondedAt = new Date();
    }

    const complaint = await this.complaintModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!complaint) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
    return complaint;
  }

  async updateStatus(id: string, status: ComplaintStatus): Promise<Complaint> {
    const complaint = await this.complaintModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();

    if (!complaint) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
    return complaint;
  }

  async remove(id: string): Promise<void> {
    const result = await this.complaintModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Complaint with ID ${id} not found`);
    }
  }
}
