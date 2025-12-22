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
import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';
import { QueryComplaintDto } from './dto/query-complaint.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { ComplaintStatus } from '../../../database/schemas/cms/complaint.schema';

@Controller({ path: 'complaints', version: '1' })
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  create(@Body() createDto: CreateComplaintDto) {
    return this.complaintsService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findAll(@Query() queryDto: QueryComplaintDto) {
    return this.complaintsService.findAll(queryDto);
  }

  @Get('reference/:referenceNumber')
  findByReferenceNumber(@Param('referenceNumber') referenceNumber: string) {
    return this.complaintsService.findByReferenceNumber(referenceNumber);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findOne(@Param() params: MongoIdDto) {
    return this.complaintsService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateComplaintDto,
    @GetUser('userId') userId: string,
  ) {
    return this.complaintsService.update(params.id, updateDto, userId);
  }

  @Patch(':id/status/:status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  updateStatus(
    @Param() params: MongoIdDto,
    @Param('status') status: ComplaintStatus,
  ) {
    return this.complaintsService.updateStatus(params.id, status);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.complaintsService.remove(params.id);
  }
}
