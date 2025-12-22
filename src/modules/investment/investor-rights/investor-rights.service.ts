import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorRights } from '../../../database/schemas/cms/investor-rights.schema';
import { CreateInvestorRightsDto } from './dto/create-investor-rights.dto';
import { UpdateInvestorRightsDto } from './dto/update-investor-rights.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class InvestorRightsService {
  constructor(
    @InjectModel(InvestorRights.name)
    private investorRightsModel: Model<InvestorRights>,
  ) {}

  async create(
    createDto: CreateInvestorRightsDto,
    userId: string,
  ): Promise<InvestorRights> {
    const investorRights = new this.investorRightsModel({
      ...createDto,
      createdBy: userId,
    });
    return investorRights.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<InvestorRights>> {
    return PaginationHelper.paginate(
      this.investorRightsModel,
      paginationDto,
      {},
      { createdAt: -1 },
    );
  }

  async findActive(): Promise<InvestorRights[]> {
    return this.investorRightsModel
      .find({ isActive: true })
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<InvestorRights> {
    const investorRights = await this.investorRightsModel.findById(id).exec();
    if (!investorRights) {
      throw new NotFoundException(`Investor Rights with ID ${id} not found`);
    }
    return investorRights;
  }

  async update(
    id: string,
    updateDto: UpdateInvestorRightsDto,
  ): Promise<InvestorRights> {
    const investorRights = await this.investorRightsModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!investorRights) {
      throw new NotFoundException(`Investor Rights with ID ${id} not found`);
    }
    return investorRights;
  }

  async toggleActive(id: string): Promise<InvestorRights> {
    const investorRights = await this.findOne(id);
    investorRights.isActive = !investorRights.isActive;
    return investorRights.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.investorRightsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Investor Rights with ID ${id} not found`);
    }
  }
}
