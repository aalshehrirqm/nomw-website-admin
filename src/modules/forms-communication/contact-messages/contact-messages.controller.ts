import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContactMessagesService } from './contact-messages.service';
import { CreateContactMessageDto } from './dto/create-contact-message.dto';
import { UpdateContactMessageDto } from './dto/update-contact-message.dto';
import { QueryContactMessageDto } from './dto/query-contact-message.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { MessageStatus } from '../../../database/schemas/cms/contact-message.schema';

@Controller({ path: 'contact-messages', version: '1' })
export class ContactMessagesController {
  constructor(
    private readonly contactMessagesService: ContactMessagesService,
  ) {}

  @Post()
  create(@Body() createDto: CreateContactMessageDto) {
    return this.contactMessagesService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findAll(@Query() queryDto: QueryContactMessageDto) {
    return this.contactMessagesService.findAll(queryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findOne(@Param() params: MongoIdDto) {
    return this.contactMessagesService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateContactMessageDto,
    @GetUser('userId') userId: string,
  ) {
    return this.contactMessagesService.update(params.id, updateDto, userId);
  }

  @Patch(':id/mark-as-read')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  markAsRead(@Param() params: MongoIdDto) {
    return this.contactMessagesService.markAsRead(params.id);
  }

  @Patch(':id/status/:status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  updateStatus(
    @Param() params: MongoIdDto,
    @Param('status') status: MessageStatus,
  ) {
    return this.contactMessagesService.updateStatus(params.id, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.contactMessagesService.remove(params.id);
  }
}
