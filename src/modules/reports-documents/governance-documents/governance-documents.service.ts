import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { GovernanceDocument } from '../../../database/schemas/cms/governance-document.schema';
import { CreateGovernanceDocumentDto } from './dto/create-governance-document.dto';
import { UpdateGovernanceDocumentDto } from './dto/update-governance-document.dto';
import { QueryGovernanceDocumentDto } from './dto/query-governance-document.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class GovernanceDocumentsService {
  constructor(
    @InjectModel(GovernanceDocument.name)
    private governanceDocumentModel: Model<GovernanceDocument>,
  ) {}

  async create(
    createDto: CreateGovernanceDocumentDto,
    userId: string,
  ): Promise<GovernanceDocument> {
    const document = new this.governanceDocumentModel({
      ...createDto,
      createdBy: userId,
    });
    return document.save();
  }

  async findAll(
    queryDto: QueryGovernanceDocumentDto,
  ): Promise<PaginationResponse<GovernanceDocument>> {
    const filter: FilterQuery<GovernanceDocument> = {};

    if (queryDto.documentType) {
      filter.documentType = queryDto.documentType;
    }

    return PaginationHelper.paginate(
      this.governanceDocumentModel,
      queryDto,
      filter,
      { publishDate: -1, createdAt: -1 },
    );
  }

  async findActive(
    queryDto: QueryGovernanceDocumentDto,
  ): Promise<PaginationResponse<GovernanceDocument>> {
    const filter: FilterQuery<GovernanceDocument> = { isActive: true };

    if (queryDto.documentType) {
      filter.documentType = queryDto.documentType;
    }

    return PaginationHelper.paginate(
      this.governanceDocumentModel,
      queryDto,
      filter,
      { publishDate: -1, createdAt: -1 },
    );
  }

  async findByType(documentType: string): Promise<GovernanceDocument[]> {
    return this.governanceDocumentModel
      .find({ documentType, isActive: true })
      .sort({ publishDate: -1 })
      .exec();
  }

  async findOne(id: string): Promise<GovernanceDocument> {
    const document = await this.governanceDocumentModel.findById(id).exec();
    if (!document) {
      throw new NotFoundException(
        `Governance Document with ID ${id} not found`,
      );
    }
    return document;
  }

  async update(
    id: string,
    updateDto: UpdateGovernanceDocumentDto,
  ): Promise<GovernanceDocument> {
    const document = await this.governanceDocumentModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!document) {
      throw new NotFoundException(
        `Governance Document with ID ${id} not found`,
      );
    }
    return document;
  }

  async toggleActive(id: string): Promise<GovernanceDocument> {
    const document = await this.findOne(id);
    document.isActive = !document.isActive;
    return document.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.governanceDocumentModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(
        `Governance Document with ID ${id} not found`,
      );
    }
  }
}
