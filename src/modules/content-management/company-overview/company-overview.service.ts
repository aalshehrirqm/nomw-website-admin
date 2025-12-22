import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyOverview } from '../../../database/schemas/cms/company-overview.schema';
import { CreateCompanyOverviewDto } from './dto/create-company-overview.dto';
import { UpdateCompanyOverviewDto } from './dto/update-company-overview.dto';

@Injectable()
export class CompanyOverviewService {
  constructor(
    @InjectModel(CompanyOverview.name)
    private companyOverviewModel: Model<CompanyOverview>,
  ) {}

  async create(
    createDto: CreateCompanyOverviewDto,
    userId: string,
  ): Promise<CompanyOverview> {
    const companyOverview = new this.companyOverviewModel({
      ...createDto,
      createdBy: userId,
    });
    return companyOverview.save();
  }

  async findAll(): Promise<CompanyOverview[]> {
    return this.companyOverviewModel.find().sort({ createdAt: -1 }).exec();
  }

  async findActive(): Promise<CompanyOverview | null> {
    return this.companyOverviewModel.findOne({ isActive: true }).exec();
  }

  async findOne(id: string): Promise<CompanyOverview | null> {
    return this.companyOverviewModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDto: UpdateCompanyOverviewDto,
    userId: string,
  ): Promise<CompanyOverview | null> {
    return this.companyOverviewModel
      .findByIdAndUpdate(id, { ...updateDto, updatedBy: userId }, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CompanyOverview | null> {
    return this.companyOverviewModel.findByIdAndDelete(id).exec();
  }
}
