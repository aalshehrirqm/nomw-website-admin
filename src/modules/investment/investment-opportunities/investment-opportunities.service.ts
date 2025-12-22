import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { InvestmentOpportunity } from '../../../database/schemas/cms/investment-opportunity.schema';
import { CreateInvestmentOpportunityDto } from './dto/create-investment-opportunity.dto';
import { UpdateInvestmentOpportunityDto } from './dto/update-investment-opportunity.dto';
import { QueryInvestmentOpportunityDto } from './dto/query-investment-opportunity.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class InvestmentOpportunitiesService {
  constructor(
    @InjectModel(InvestmentOpportunity.name)
    private investmentOpportunityModel: Model<InvestmentOpportunity>,
  ) {}

  async create(
    createDto: CreateInvestmentOpportunityDto,
    userId: string,
  ): Promise<InvestmentOpportunity> {
    const opportunity = new this.investmentOpportunityModel({
      ...createDto,
      createdBy: userId,
    });
    return opportunity.save();
  }

  async findAll(
    queryDto: QueryInvestmentOpportunityDto,
  ): Promise<PaginationResponse<InvestmentOpportunity>> {
    const filter: FilterQuery<InvestmentOpportunity> = {};

    if (queryDto.category) {
      filter.category = queryDto.category;
    }

    if (queryDto.status) {
      filter.status = queryDto.status;
    }

    if (queryDto.riskLevel) {
      filter.riskLevel = queryDto.riskLevel;
    }

    return PaginationHelper.paginate(
      this.investmentOpportunityModel,
      queryDto,
      filter,
      { createdAt: -1 },
    );
  }

  async findActive(
    queryDto: QueryInvestmentOpportunityDto,
  ): Promise<PaginationResponse<InvestmentOpportunity>> {
    const filter: FilterQuery<InvestmentOpportunity> = { isActive: true };

    if (queryDto.category) {
      filter.category = queryDto.category;
    }

    if (queryDto.status) {
      filter.status = queryDto.status;
    }

    if (queryDto.riskLevel) {
      filter.riskLevel = queryDto.riskLevel;
    }

    return PaginationHelper.paginate(
      this.investmentOpportunityModel,
      queryDto,
      filter,
      { createdAt: -1 },
    );
  }

  async findByCategory(category: string): Promise<InvestmentOpportunity[]> {
    return this.investmentOpportunityModel
      .find({ category, isActive: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<InvestmentOpportunity> {
    const opportunity = await this.investmentOpportunityModel
      .findById(id)
      .exec();
    if (!opportunity) {
      throw new NotFoundException(
        `Investment Opportunity with ID ${id} not found`,
      );
    }
    return opportunity;
  }

  async update(
    id: string,
    updateDto: UpdateInvestmentOpportunityDto,
  ): Promise<InvestmentOpportunity> {
    const opportunity = await this.investmentOpportunityModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!opportunity) {
      throw new NotFoundException(
        `Investment Opportunity with ID ${id} not found`,
      );
    }
    return opportunity;
  }

  async toggleActive(id: string): Promise<InvestmentOpportunity> {
    const opportunity = await this.findOne(id);
    opportunity.isActive = !opportunity.isActive;
    return opportunity.save();
  }

  async updateStatus(
    id: string,
    status: string,
  ): Promise<InvestmentOpportunity> {
    const opportunity = await this.investmentOpportunityModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();
    if (!opportunity) {
      throw new NotFoundException(
        `Investment Opportunity with ID ${id} not found`,
      );
    }
    return opportunity;
  }

  async remove(id: string): Promise<void> {
    const result = await this.investmentOpportunityModel
      .findByIdAndDelete(id)
      .exec();
    if (!result) {
      throw new NotFoundException(
        `Investment Opportunity with ID ${id} not found`,
      );
    }
  }
}
