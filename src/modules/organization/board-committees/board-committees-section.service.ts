import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardCommitteesSection } from '../../../database/schemas/cms/board-committees-section.schema';
import { CreateBoardCommitteesSectionDto } from './dto/create-board-committees-section.dto';
import { UpdateBoardCommitteesSectionDto } from './dto/update-board-committees-section.dto';

@Injectable()
export class BoardCommitteesSectionService {
  constructor(
    @InjectModel(BoardCommitteesSection.name)
    private sectionModel: Model<BoardCommitteesSection>,
  ) {}

  async create(
    createDto: CreateBoardCommitteesSectionDto,
    userId: string,
  ): Promise<BoardCommitteesSection> {
    const section = new this.sectionModel({
      ...createDto,
      createdBy: userId,
    });
    return section.save();
  }

  async findActive(): Promise<BoardCommitteesSection> {
    const section = await this.sectionModel.findOne({ isActive: true }).exec();
    if (!section) {
      throw new NotFoundException('Board committees section content not found');
    }
    return section;
  }

  async findOne(id: string): Promise<BoardCommitteesSection> {
    const section = await this.sectionModel.findById(id).exec();
    if (!section) {
      throw new NotFoundException(
        `Board committees section with ID ${id} not found`,
      );
    }
    return section;
  }

  async update(
    id: string,
    updateDto: UpdateBoardCommitteesSectionDto,
  ): Promise<BoardCommitteesSection> {
    const section = await this.sectionModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!section) {
      throw new NotFoundException(
        `Board committees section with ID ${id} not found`,
      );
    }
    return section;
  }

  async toggleActive(id: string): Promise<BoardCommitteesSection> {
    const section = await this.findOne(id);
    section.isActive = !section.isActive;
    return section.save();
  }

  async getOrCreate(): Promise<BoardCommitteesSection> {
    let section = await this.sectionModel.findOne().exec();

    if (!section) {
      section = new this.sectionModel({
        title: {
          ar: 'لجان مجلس الإدارة',
          en: 'Board Committees',
        },
        subtitle: {
          ar: 'تُعد اللجان المنبثقة عن مجلس الإدارة جزءاً جوهرياً من منظومة الحوكمة',
          en: 'Board committees are an integral part of the governance system',
        },
        isActive: true,
      });
      await section.save();
    }

    return section;
  }
}
