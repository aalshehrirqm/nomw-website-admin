import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestorRight } from '../../../database/schemas/cms/investor-right.schema';
import { CreateInvestorRightDto } from './dto/create-investor-right.dto';
import { UpdateInvestorRightDto } from './dto/update-investor-right.dto';

@Injectable()
export class InvestorRightsService {
  constructor(
    @InjectModel(InvestorRight.name)
    private rightModel: Model<InvestorRight>,
  ) {}

  async create(
    createDto: CreateInvestorRightDto,
    userId: string,
  ): Promise<InvestorRight> {
    const right = new this.rightModel({
      ...createDto,
      createdBy: userId,
    });
    return right.save();
  }

  async findAll(): Promise<{ data: InvestorRight[] }> {
    const data = await this.rightModel.find().sort({ order: 1 }).exec();
    return { data };
  }

  async findActive(): Promise<InvestorRight[]> {
    return this.rightModel.find({ isActive: true }).sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<InvestorRight> {
    const right = await this.rightModel.findById(id).exec();
    if (!right) {
      throw new NotFoundException(`Investor right with ID ${id} not found`);
    }
    return right;
  }

  async update(
    id: string,
    updateDto: UpdateInvestorRightDto,
  ): Promise<InvestorRight> {
    const right = await this.rightModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!right) {
      throw new NotFoundException(`Investor right with ID ${id} not found`);
    }
    return right;
  }

  async toggleActive(id: string): Promise<InvestorRight> {
    const right = await this.findOne(id);
    right.isActive = !right.isActive;
    return right.save();
  }

  async delete(id: string): Promise<void> {
    const result = await this.rightModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Investor right with ID ${id} not found`);
    }
  }
}
