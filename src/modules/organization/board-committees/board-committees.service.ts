import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardCommittee } from '../../../database/schemas/cms/board-committee.schema';
import { CreateBoardCommitteeDto } from './dto/create-board-committee.dto';
import { UpdateBoardCommitteeDto } from './dto/update-board-committee.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class BoardCommitteesService {
  constructor(
    @InjectModel(BoardCommittee.name)
    private boardCommitteeModel: Model<BoardCommittee>,
  ) {}

  async create(
    createDto: CreateBoardCommitteeDto,
    userId: string,
  ): Promise<BoardCommittee> {
    const committee = new this.boardCommitteeModel({
      ...createDto,
      createdBy: userId,
    });
    return committee.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<BoardCommittee>> {
    return PaginationHelper.paginate(
      this.boardCommitteeModel,
      paginationDto,
      {},
      { order: 1, createdAt: -1 },
    );
  }

  async findActive(): Promise<BoardCommittee[]> {
    return this.boardCommitteeModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<BoardCommittee> {
    const committee = await this.boardCommitteeModel.findById(id).exec();
    if (!committee) {
      throw new NotFoundException(`Board committee with ID ${id} not found`);
    }
    return committee;
  }

  async update(
    id: string,
    updateDto: UpdateBoardCommitteeDto,
  ): Promise<BoardCommittee> {
    const committee = await this.boardCommitteeModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!committee) {
      throw new NotFoundException(`Board committee with ID ${id} not found`);
    }
    return committee;
  }

  async toggleActive(id: string): Promise<BoardCommittee> {
    const committee = await this.findOne(id);
    committee.isActive = !committee.isActive;
    return committee.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.boardCommitteeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Board committee with ID ${id} not found`);
    }
  }
}
