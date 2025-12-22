import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '../../../database/schemas/cms/service.schema';
import { ActivityLog } from '../../../database/schemas/cms/activity-log.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    @InjectModel(ActivityLog.name)
    private activityLogModel: Model<ActivityLog>,
  ) { }

  async create(createDto: CreateServiceDto, userId: string): Promise<Service> {
    // Generate serviceId from English title if not provided
    if (!createDto.serviceId) {
      createDto.serviceId = this.generateServiceId(createDto.title.en);
    }

    // Generate serviceId for sub-services if not provided
    if (createDto.subServices && createDto.subServices.length > 0) {
      createDto.subServices = createDto.subServices.map((sub) => ({
        ...sub,
        serviceId: sub.serviceId || this.generateServiceId(sub.title.en),
      }));
    }

    const service = new this.serviceModel({
      ...createDto,
      createdBy: userId,
    });
    const saved = await service.save();

    await this.activityLogModel.create({
      userId,
      action: 'created',
      entityType: 'Service',
      entityId: saved._id,
    });

    return saved;
  }

  private generateServiceId(title: string): string {
    // Convert to camelCase: "Asset Management" -> "assetManagement"
    return title
      .split(' ')
      .map((word, index) => {
        word = word.toLowerCase();
        if (index === 0) return word;
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<Service>> {
    return PaginationHelper.paginate(
      this.serviceModel,
      paginationDto,
      {},
      { order: 1, createdAt: -1 },
    );
  }

  async findActive(): Promise<Service[]> {
    return this.serviceModel.find({ isActive: true }).sort({ order: 1 }).exec();
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async update(id: string, updateDto: UpdateServiceDto, userId?: string): Promise<Service> {
    const service = await this.serviceModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'updated',
        entityType: 'Service',
        entityId: id,
      });
    }

    return service;
  }

  async remove(id: string, userId?: string): Promise<void> {
    const result = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    if (userId) {
      await this.activityLogModel.create({
        userId,
        action: 'deleted',
        entityType: 'Service',
        entityId: id,
      });
    }
  }

  async toggleActive(id: string): Promise<Service> {
    const service = await this.findOne(id);
    service.isActive = !service.isActive;
    return service.save();
  }
}
