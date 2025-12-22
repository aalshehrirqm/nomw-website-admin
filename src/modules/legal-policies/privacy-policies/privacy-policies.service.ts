import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PrivacyPolicy } from '../../../database/schemas/cms/privacy-policy.schema';
import { CreatePrivacyPolicyDto } from './dto/create-privacy-policy.dto';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class PrivacyPoliciesService {
  constructor(
    @InjectModel(PrivacyPolicy.name)
    private privacyPolicyModel: Model<PrivacyPolicy>,
  ) {}

  async create(
    createDto: CreatePrivacyPolicyDto,
    userId: string,
  ): Promise<PrivacyPolicy> {
    const policy = new this.privacyPolicyModel({
      ...createDto,
      createdBy: userId,
    });
    return policy.save();
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginationResponse<PrivacyPolicy>> {
    return PaginationHelper.paginate(
      this.privacyPolicyModel,
      paginationDto,
      {},
      { effectiveDate: -1, createdAt: -1 },
    );
  }

  async findActive(): Promise<PrivacyPolicy> {
    const policy = await this.privacyPolicyModel
      .findOne({ isActive: true })
      .sort({ effectiveDate: -1 })
      .exec();

    if (!policy) {
      throw new NotFoundException('No active privacy policy found');
    }
    return policy;
  }

  async findLatest(): Promise<PrivacyPolicy> {
    const policy = await this.privacyPolicyModel
      .findOne()
      .sort({ effectiveDate: -1 })
      .exec();

    if (!policy) {
      throw new NotFoundException('No privacy policy found');
    }
    return policy;
  }

  async findOne(id: string): Promise<PrivacyPolicy> {
    const policy = await this.privacyPolicyModel.findById(id).exec();
    if (!policy) {
      throw new NotFoundException(`Privacy Policy with ID ${id} not found`);
    }
    return policy;
  }

  async update(
    id: string,
    updateDto: UpdatePrivacyPolicyDto,
  ): Promise<PrivacyPolicy> {
    const policy = await this.privacyPolicyModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
    if (!policy) {
      throw new NotFoundException(`Privacy Policy with ID ${id} not found`);
    }
    return policy;
  }

  async toggleActive(id: string): Promise<PrivacyPolicy> {
    const policy = await this.findOne(id);
    policy.isActive = !policy.isActive;
    return policy.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.privacyPolicyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Privacy Policy with ID ${id} not found`);
    }
  }
}
