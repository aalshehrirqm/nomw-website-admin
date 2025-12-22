import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import {
  ContactMessage,
  MessageStatus,
} from '../../../database/schemas/cms/contact-message.schema';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessageDto } from './dto/query-contact-message.dto';
import { PaginationResponse } from '../../../common/interfaces/pagination-response.interface';
import { PaginationHelper } from '../../../common/helpers/pagination.helper';

@Injectable()
export class ContactMessagesService {
  constructor(
    @InjectModel(ContactMessage.name)
    private contactMessageModel: Model<ContactMessage>,
  ) {}

  async create(createDto: CreateContactMessageDto): Promise<ContactMessage> {
    const message = new this.contactMessageModel(createDto);
    return message.save();
  }

  async findAll(
    queryDto: QueryContactMessageDto,
  ): Promise<PaginationResponse<ContactMessage>> {
    const filter: FilterQuery<ContactMessage> = {};

    if (queryDto.status) {
      filter.status = queryDto.status;
    }

    if (queryDto.messageType) {
      filter.messageType = queryDto.messageType;
    }

    if (queryDto.priority) {
      filter.priority = queryDto.priority;
    }

    return PaginationHelper.paginate(
      this.contactMessageModel,
      queryDto,
      filter,
      { createdAt: -1 },
    );
  }

  async findOne(id: string): Promise<ContactMessage> {
    const message = await this.contactMessageModel.findById(id).exec();
    if (!message) {
      throw new NotFoundException(`Contact Message with ID ${id} not found`);
    }
    return message;
  }

  async update(
    id: string,
    updateDto: UpdateContactMessageDto,
    userId?: string,
  ): Promise<ContactMessage> {
    const updateData: any = { ...updateDto };

    if (updateDto.response && userId) {
      updateData.respondedBy = userId;
      updateData.respondedAt = new Date();
    }

    const message = await this.contactMessageModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!message) {
      throw new NotFoundException(`Contact Message with ID ${id} not found`);
    }
    return message;
  }

  async markAsRead(id: string): Promise<ContactMessage> {
    const message = await this.contactMessageModel
      .findByIdAndUpdate(id, { status: MessageStatus.READ }, { new: true })
      .exec();

    if (!message) {
      throw new NotFoundException(`Contact Message with ID ${id} not found`);
    }
    return message;
  }

  async updateStatus(
    id: string,
    status: MessageStatus,
  ): Promise<ContactMessage> {
    const message = await this.contactMessageModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();

    if (!message) {
      throw new NotFoundException(`Contact Message with ID ${id} not found`);
    }
    return message;
  }

  async remove(id: string): Promise<void> {
    const result = await this.contactMessageModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Contact Message with ID ${id} not found`);
    }
  }
}
