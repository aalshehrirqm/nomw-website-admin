import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GovernanceContent } from '../../database/schemas/cms/governance-content.schema';
import { ActivityLog } from '../../database/schemas/cms/activity-log.schema';
import { CreateGovernanceContentDto } from './dto/create-governance-content.dto';
import { UpdateGovernanceContentDto } from './dto/update-governance-content.dto';
import { QueryGovernanceContentDto } from './dto/query-governance-content.dto';

@Injectable()
export class GovernanceContentService {
    constructor(
        @InjectModel(GovernanceContent.name)
        private governanceContentModel: Model<GovernanceContent>,
        @InjectModel(ActivityLog.name)
        private activityLogModel: Model<ActivityLog>,
    ) { }

    async findAll(query: QueryGovernanceContentDto) {
        const { page = 1, limit = 20, search, type } = query;
        const skip = (page - 1) * limit;

        const filter: any = {};
        if (search) {
            filter.$or = [
                { 'title.ar': { $regex: search, $options: 'i' } },
                { 'title.en': { $regex: search, $options: 'i' } },
            ];
        }
        if (type) {
            filter.type = type;
        }

        const [data, total] = await Promise.all([
            this.governanceContentModel
                .find(filter)
                .sort({ type: 1, order: 1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.governanceContentModel.countDocuments(filter),
        ]);

        return {
            data,
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }

    async findAllActive() {
        const data = await this.governanceContentModel
            .find({ isActive: true })
            .sort({ type: 1, order: 1 })
            .exec();
        return { data };
    }

    async findOne(id: string) {
        const item = await this.governanceContentModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException(`Governance content #${id} not found`);
        }
        return item;
    }

    async create(createDto: CreateGovernanceContentDto, userId?: string) {
        const item = new this.governanceContentModel(createDto);
        const saved = await item.save();

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'created',
                entityType: 'GovernanceContent',
                entityId: saved._id,
            });
        }

        return saved;
    }

    async update(id: string, updateDto: UpdateGovernanceContentDto, userId?: string) {
        const item = await this.governanceContentModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
        if (!item) {
            throw new NotFoundException(`Governance content #${id} not found`);
        }

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'updated',
                entityType: 'GovernanceContent',
                entityId: id,
            });
        }

        return item;
    }

    async toggleActive(id: string) {
        const item = await this.findOne(id);
        item.isActive = !item.isActive;
        return item.save();
    }

    async remove(id: string, userId?: string) {
        const result = await this.governanceContentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Governance content #${id} not found`);
        }

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'deleted',
                entityType: 'GovernanceContent',
                entityId: id,
            });
        }

        return result;
    }

    async bulkDelete(ids: string[]) {
        return this.governanceContentModel.deleteMany({ _id: { $in: ids } });
    }
}
