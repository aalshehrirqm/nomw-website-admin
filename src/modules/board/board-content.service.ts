import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardContent } from '../../database/schemas/cms/board-content.schema';
import { ActivityLog } from '../../database/schemas/cms/activity-log.schema';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { QueryBoardContentDto } from './dto/query-board-content.dto';

@Injectable()
export class BoardContentService {
    constructor(
        @InjectModel(BoardContent.name)
        private boardContentModel: Model<BoardContent>,
        @InjectModel(ActivityLog.name)
        private activityLogModel: Model<ActivityLog>,
    ) { }

    async findAll(query: QueryBoardContentDto) {
        const { page = 1, limit = 50, search, type } = query;
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
            this.boardContentModel
                .find(filter)
                .sort({ type: 1, order: 1 })
                .skip(skip)
                .limit(limit)
                .exec(),
            this.boardContentModel.countDocuments(filter),
        ]);

        return {
            data,
            pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
        };
    }

    async findAllActive() {
        const data = await this.boardContentModel
            .find({ isActive: true })
            .sort({ type: 1, order: 1 })
            .exec();
        return { data };
    }

    async findOne(id: string) {
        const item = await this.boardContentModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException(`Board content #${id} not found`);
        }
        return item;
    }

    async create(createDto: CreateBoardContentDto, userId?: string) {
        const item = new this.boardContentModel(createDto);
        const saved = await item.save();

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'created',
                entityType: 'BoardContent',
                entityId: saved._id,
            });
        }

        return saved;
    }

    async update(id: string, updateDto: UpdateBoardContentDto, userId?: string) {
        const item = await this.boardContentModel
            .findByIdAndUpdate(id, updateDto, { new: true })
            .exec();
        if (!item) {
            throw new NotFoundException(`Board content #${id} not found`);
        }

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'updated',
                entityType: 'BoardContent',
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
        const result = await this.boardContentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`Board content #${id} not found`);
        }

        if (userId) {
            await this.activityLogModel.create({
                userId,
                action: 'deleted',
                entityType: 'BoardContent',
                entityId: id,
            });
        }

        return result;
    }

    async bulkDelete(ids: string[]) {
        return this.boardContentModel.deleteMany({ _id: { $in: ids } });
    }
}
