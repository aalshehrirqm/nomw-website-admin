import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { LegalConsultation } from '../../../database/schemas/cms/legal-consultation.schema';
import { CreateLegalConsultationDto } from './dto/create-legal-consultation.dto';
import { UpdateLegalConsultationDto } from './dto/update-legal-consultation.dto';
import { QueryLegalConsultationDto } from './dto/query-legal-consultation.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class LegalConsultationsService {
  constructor(
    @InjectModel(LegalConsultation.name)
    private legalConsultationModel: Model<LegalConsultation>,
  ) {}

  async create(
    createDto: CreateLegalConsultationDto,
    userId: string,
  ): Promise<LegalConsultation> {
    const consultation = new this.legalConsultationModel({
      ...createDto,
      createdBy: userId,
    });
    return consultation.save();
  }

  async findAll(
    queryDto: QueryLegalConsultationDto,
  ): Promise<PaginationResponse<LegalConsultation>> {
    const filter: FilterQuery<LegalConsultation> = {};

    if (queryDto.category) {
      filter.category = queryDto.category;
    }

    return PaginationHelper.paginate(
      this.legalConsultationModel,
      queryDto,
      filter,
      { publishDate: -1, createdAt: -1 },
    );
  }

  async findActive(
    queryDto: QueryLegalConsultationDto,
  ): Promise<PaginationResponse<LegalConsultation>> {
    const filter: FilterQuery<LegalConsultation> = { isActive: true };

    if (queryDto.category) {
      filter.category = queryDto.category;
    }

    return PaginationHelper.paginate(
      this.legalConsultationModel,
      queryDto,
      filter,
      { publishDate: -1, createdAt: -1 },
    );
  }

  async findByCategory(category: string): Promise<LegalConsultation[]> {
    return this.legalConsultationModel
      .find({ category, isActive: true })
      .sort({ publishDate: -1 })
      .exec();
  }

  async findOne(id: string): Promise<LegalConsultation> {
    const consultation = await this.legalConsultationModel.findById(id).exec();
    if (!consultation) {
      throw new NotFoundException(`Legal Consultation with ID ${id} not found`);
    }
    return consultation;
  }

  async update(
    id: string,
    updateDto: UpdateLegalConsultationDto,
  ): Promise<LegalConsultation> {
    const consultation = await this.legalConsultationModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!consultation) {
      throw new NotFoundException(`Legal Consultation with ID ${id} not found`);
    }
    return consultation;
  }

  async toggleActive(id: string): Promise<LegalConsultation> {
    const consultation = await this.findOne(id);
    consultation.isActive = !consultation.isActive;
    return consultation.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.legalConsultationModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(`Legal Consultation with ID ${id} not found`);
    }
  }
}
