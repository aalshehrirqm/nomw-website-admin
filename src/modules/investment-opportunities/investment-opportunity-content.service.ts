import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvestmentOpportunityContent } from '../../database/schemas/cms/investment-opportunity-content.schema';
import { ActivityLog } from '../../database/schemas/cms/activity-log.schema';
import { CreateInvestmentOpportunityContentDto } from './dto/create-investment-opportunity-content.dto';
import { UpdateInvestmentOpportunityContentDto } from './dto/update-investment-opportunity-content.dto';
import { QueryInvestmentOpportunityContentDto } from './dto/query-investment-opportunity-content.dto';

@Injectable()
export class InvestmentOpportunityContentService {
    constructor(
        @InjectModel(InvestmentOpportunityContent.name)
        private investmentOpportunityContentModel: Model<InvestmentOpportunityContent>,
        @InjectModel(ActivityLog.name)
        private activityLogModel: Model<ActivityLog>,
    ) { }

    async findAll(query: QueryInvestmentOpportunityContentDto) {
        const { page = 1, limit = 10, search, type } = query;
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
            this.investmentOpportunityContentModel
                .find(filter)
                .sort({ type: 1, order: 1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.investmentOpportunityContentModel.countDocuments(filter),
        ]);

        return {
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findAllActive() {
        const data = await this.investmentOpportunityContentModel
            .find({ isActive: true })
            .sort({ type: 1, order: 1 })
            .exec();

        return { data };
    }

    async findOne(id: string) {
        const item = await this.investmentOpportunityContentModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException(`Investment opportunity content #${id} not found`);
        }
        return item;
    }

    async create(createDto: CreateInvestmentOpportunityContentDto, userId?: string) {
        const item = new this.investmentOpportunityContentModel(createDto);
        const saved = await item.save();

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'created',
                entityType: 'InvestmentOpportunityContent',
                entityId: saved._id,
            });
        }

        return saved;
    }

    async update(id: string, updateDto: UpdateInvestmentOpportunityContentDto, userId?: string) {
        const item = await this.investmentOpportunityContentModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();

        if (!item) {
            throw new NotFoundException(`Investment opportunity content #${id} not found`);
        }

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'updated',
                entityType: 'InvestmentOpportunityContent',
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
        const result = await this.investmentOpportunityContentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Investment opportunity content #${id} not found`);
        }

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'deleted',
                entityType: 'InvestmentOpportunityContent',
                entityId: id,
            });
        }

        return result;
    }

    async bulkDelete(ids: string[]) {
        const result = await this.investmentOpportunityContentModel.deleteMany({
            _id: { $in: ids },
        });
        return result;
    }
}
