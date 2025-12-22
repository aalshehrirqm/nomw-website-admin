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
import { ComplaintGuidesService } from './complaint-guides.service';
import { CreateComplaintGuideDto } from './dto/create-complaint-guide.dto';
import { UpdateComplaintGuideDto } from './dto/update-complaint-guide.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Controller({ path: 'complaint-guides', version: '1' })
export class ComplaintGuidesController {
  constructor(
    private readonly complaintGuidesService: ComplaintGuidesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  create(
    @Body() createDto: CreateComplaintGuideDto,
    @GetUser('userId') userId: string,
  ) {
    return this.complaintGuidesService.create(createDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.complaintGuidesService.findAll(paginationDto);
  }

  @Get('active')
  findActive() {
    return this.complaintGuidesService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.complaintGuidesService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateComplaintGuideDto,
  ) {
    return this.complaintGuidesService.update(params.id, updateDto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  toggleActive(@Param() params: MongoIdDto) {
    return this.complaintGuidesService.toggleActive(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.complaintGuidesService.remove(params.id);
  }
}
