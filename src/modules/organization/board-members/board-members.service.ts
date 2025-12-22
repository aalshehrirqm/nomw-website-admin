import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardMember } from '../../../database/schemas/cms/board-member.schema';
import { CreateBoardMemberDto } from './dto/create-board-member.dto';
import { UpdateBoardMemberDto } from './dto/update-board-member.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class BoardMembersService {
  private readonly DEFAULT_IMAGE = '/uploads/defaults/nomow.png';

  constructor(
    @InjectModel(BoardMember.name)
    private boardMemberModel: Model<BoardMember>,
  ) { }

  async create(
    createDto: CreateBoardMemberDto,
    userId: string,
  ): Promise<BoardMember> {
    const boardMember = new this.boardMemberModel({
      ...createDto,
      image: createDto.image || this.DEFAULT_IMAGE,
      createdBy: userId,
    });
    return boardMember.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<BoardMember>> {
    return PaginationHelper.paginate(
      this.boardMemberModel,
      paginationDto,
      {},
      { order: 1, createdAt: -1 },
    );
  }

  async findActive(): Promise<BoardMember[]> {
    return this.boardMemberModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<BoardMember> {
    const boardMember = await this.boardMemberModel.findById(id).exec();
    if (!boardMember) {
      throw new NotFoundException(`Board member with ID ${id} not found`);
    }
    return boardMember;
  }

  async update(
    id: string,
    updateDto: UpdateBoardMemberDto,
  ): Promise<BoardMember> {
    const boardMember = await this.boardMemberModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!boardMember) {
      throw new NotFoundException(`Board member with ID ${id} not found`);
    }
    return boardMember;
  }

  async toggleActive(id: string): Promise<BoardMember> {
    const boardMember = await this.findOne(id);
    boardMember.isActive = !boardMember.isActive;
    return boardMember.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.boardMemberModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Board member with ID ${id} not found`);
    }
  }
}
