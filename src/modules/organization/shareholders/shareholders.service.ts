import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shareholder } from '../../../database/schemas/cms/shareholder.schema';
import { CreateShareholderDto } from './dto/create-shareholder.dto';
import { UpdateShareholderDto } from './dto/update-shareholder.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ShareholdersService {
  constructor(
    @InjectModel(Shareholder.name)
    private shareholderModel: Model<Shareholder>,
  ) {}

  async create(
    createDto: CreateShareholderDto,
    userId: string,
  ): Promise<Shareholder> {
    const shareholder = new this.shareholderModel({
      ...createDto,
      createdBy: userId,
    });
    return shareholder.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Shareholder>> {
    return PaginationHelper.paginate(
      this.shareholderModel,
      paginationDto,
      {},
      { percentage: -1 },
    );
  }

  async findActive(): Promise<Shareholder[]> {
    return this.shareholderModel
      .find({ isActive: true })
      .sort({ percentage: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Shareholder> {
    const shareholder = await this.shareholderModel.findById(id).exec();
    if (!shareholder) {
      throw new NotFoundException(`Shareholder with ID ${id} not found`);
    }
    return shareholder;
  }

  async update(
    id: string,
    updateDto: UpdateShareholderDto,
  ): Promise<Shareholder> {
    const shareholder = await this.shareholderModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!shareholder) {
      throw new NotFoundException(`Shareholder with ID ${id} not found`);
    }
    return shareholder;
  }

  async toggleActive(id: string): Promise<Shareholder> {
    const shareholder = await this.findOne(id);
    shareholder.isActive = !shareholder.isActive;
    return shareholder.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.shareholderModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Shareholder with ID ${id} not found`);
    }
  }
}
