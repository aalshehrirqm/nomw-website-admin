import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ManagementTeam } from '../../../database/schemas/cms/management-team.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateManagementTeamDto } from './dto/create-management-team.dto';
import { UpdateManagementTeamDto } from './dto/update-management-team.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ManagementTeamService {
  private readonly DEFAULT_IMAGE = '/uploads/defaults/nomow.png';

  constructor(
    @InjectModel(ManagementTeam.name)
    private managementTeamModel: Model<ManagementTeam>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(
    createDto: CreateManagementTeamDto,
    userId: string,
    file?: Express.Multer.File,
  ): Promise<ManagementTeam> {
    const member = new this.managementTeamModel({
      ...createDto,
      photo: file ? `/uploads/management/${file.filename}` : this.DEFAULT_IMAGE,
      createdBy: userId,
    });
    const saved = await member.save();

    await this.activityLogModel.create({
      userId,
      action: 'created',
      entityType: 'ManagementTeam',
      entityId: saved._id,
    });

    return saved;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<ManagementTeam>> {
    return PaginationHelper.paginate(
      this.managementTeamModel,
      paginationDto,
      {},
      { order: 1, createdAt: -1 },
    );
  }

  async findActive(): Promise<ManagementTeam[]> {
    return this.managementTeamModel
      .find({ isActive: true })
      .sort({ order: 1 })
      .exec();
  }

  async findOne(id: string): Promise<ManagementTeam> {
    const member = await this.managementTeamModel.findById(id).exec();
    if (!member) {
      throw new NotFoundException(
        `Management team member with ID ${id} not found`,
      );
    }
    return member;
  }

  async update(
    id: string,
    updateDto: UpdateManagementTeamDto,
    userId?: string,
    file?: Express.Multer.File,
  ): Promise<ManagementTeam> {
    const updateData = {
      ...updateDto,
      ...(file && { image: `/uploads/management-team/${file.filename}` }),
    };

    const member = await this.managementTeamModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!member) {
      throw new NotFoundException(
        `Management team member with ID ${id} not found`,
      );
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'updated',
        entityType: 'ManagementTeam',
        entityId: id,
      });
    }

    return member;
  }

  async toggleActive(id: string): Promise<ManagementTeam> {
    const member = await this.findOne(id);
    member.isActive = !member.isActive;
    return member.save();
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.managementTeamModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(
        `Management team member with ID ${id} not found`,
      );
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'deleted',
        entityType: 'ManagementTeam',
        entityId: id,
      });
    }
  }
}
