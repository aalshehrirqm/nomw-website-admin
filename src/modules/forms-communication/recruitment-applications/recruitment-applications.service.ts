import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  RecruitmentApplication,
  ApplicationStatus,
} from '../../../database/schemas/cms/recruitment-application.schema';
import { CreateRecruitmentApplicationDto } from './dto/create-recruitment-application.dto';
import { UpdateRecruitmentApplicationDto } from './dto/update-recruitment-application.dto';
import { QueryRecruitmentApplicationDto } from './dto/query-recruitment-application.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class RecruitmentApplicationsService {
  constructor(
    @InjectModel(RecruitmentApplication.name)
    private recruitmentApplicationModel: Model<RecruitmentApplication>,
  ) {}

  async create(
    createDto: CreateRecruitmentApplicationDto,
  ): Promise<RecruitmentApplication> {
    const application = new this.recruitmentApplicationModel(createDto);
    return application.save();
  }

  async findAll(
    queryDto: QueryRecruitmentApplicationDto,
  ): Promise<PaginationResponse<RecruitmentApplication>> {
    const filter: FilterQuery<RecruitmentApplication> = {};

    if (queryDto.status) {
      filter.status = queryDto.status;
    }

    if (queryDto.position) {
      filter.position = { $regex: queryDto.position, $options: 'i' };
    }

    return PaginationHelper.paginate(
      this.recruitmentApplicationModel,
      queryDto,
      filter,
      { createdAt: -1 },
    );
  }

  async findOne(id: string): Promise<RecruitmentApplication> {
    const application = await this.recruitmentApplicationModel
      .findById(id)
      .exec();
    if (!application) {
      throw new NotFoundException(
        `Recruitment Application with ID ${id} not found`,
      );
    }
    return application;
  }

  async update(
    id: string,
    updateDto: UpdateRecruitmentApplicationDto,
    userId?: string,
  ): Promise<RecruitmentApplication> {
    const updateData: any = { ...updateDto };

    if (userId) {
      updateData.reviewedBy = userId;
      updateData.reviewedAt = new Date();
    }

    const application = await this.recruitmentApplicationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!application) {
      throw new NotFoundException(
        `Recruitment Application with ID ${id} not found`,
      );
    }
    return application;
  }

  async updateStatus(
    id: string,
    status: ApplicationStatus,
    userId?: string,
  ): Promise<RecruitmentApplication> {
    const updateData: any = { status };

    if (userId) {
      updateData.reviewedBy = userId;
      updateData.reviewedAt = new Date();
    }

    const application = await this.recruitmentApplicationModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!application) {
      throw new NotFoundException(
        `Recruitment Application with ID ${id} not found`,
      );
    }
    return application;
  }

  async remove(id: string): Promise<void> {
    const result = await this.recruitmentApplicationModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(
        `Recruitment Application with ID ${id} not found`,
      );
    }
  }
}
