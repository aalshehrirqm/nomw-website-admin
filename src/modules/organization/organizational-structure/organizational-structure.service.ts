import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrganizationalStructure } from '../../../database/schemas/cms/organizational-structure.schema';
import { CreateOrganizationalStructureDto } from './dto/create-organizational-structure.dto';
import { UpdateOrganizationalStructureDto } from './dto/update-organizational-structure.dto';

@Injectable()
export class OrganizationalStructureService {
  constructor(
    @InjectModel(OrganizationalStructure.name)
    private structureModel: Model<OrganizationalStructure>,
  ) {}

  async create(
    createDto: CreateOrganizationalStructureDto,
    imageArPath: string,
    imageEnPath: string,
    userId: string,
  ): Promise<OrganizationalStructure> {
    const structure = new this.structureModel({
      ...createDto,
      image_ar: imageArPath,
      image_en: imageEnPath,
      createdBy: userId,
    });
    return structure.save();
  }

  async findActive(): Promise<OrganizationalStructure> {
    const structure = await this.structureModel
      .findOne({ isActive: true })
      .exec();
    if (!structure) {
      throw new NotFoundException('Organizational structure not found');
    }
    return structure;
  }

  async findOne(id: string): Promise<OrganizationalStructure> {
    const structure = await this.structureModel.findById(id).exec();
    if (!structure) {
      throw new NotFoundException(
        `Organizational structure with ID ${id} not found`,
      );
    }
    return structure;
  }

  async update(
    id: string,
    updateDto: UpdateOrganizationalStructureDto,
    imageArPath?: string,
    imageEnPath?: string,
  ): Promise<OrganizationalStructure> {
    const updateData: any = { ...updateDto };

    if (imageArPath) {
      updateData.image_ar = imageArPath;
    }
    if (imageEnPath) {
      updateData.image_en = imageEnPath;
    }

    const structure = await this.structureModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!structure) {
      throw new NotFoundException(
        `Organizational structure with ID ${id} not found`,
      );
    }
    return structure;
  }

  async toggleActive(id: string): Promise<OrganizationalStructure> {
    const structure = await this.findOne(id);
    structure.isActive = !structure.isActive;
    return structure.save();
  }

  async getOrCreate(): Promise<OrganizationalStructure> {
    let structure = await this.structureModel.findOne().exec();

    if (!structure) {
      structure = new this.structureModel({
        title: {
          ar: 'الهيكل التنظيمي',
          en: 'Organizational Structure',
        },
        image_ar: '/uploads/org-structure-ar.png',
        image_en: '/uploads/org-structure-en.png',
        isActive: true,
      });
      await structure.save();
    }

    return structure;
  }
}
