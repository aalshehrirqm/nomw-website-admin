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
import { RecruitmentApplicationsService } from './recruitment-applications.service';
import { CreateRecruitmentApplicationDto } from './dto/create-recruitment-application.dto';
import { UpdateRecruitmentApplicationDto } from './dto/update-recruitment-application.dto';
import { QueryRecruitmentApplicationDto } from './dto/query-recruitment-application.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { ApplicationStatus } from '../../../database/schemas/cms/recruitment-application.schema';

@Controller({ path: 'recruitment-applications', version: '1' })
export class RecruitmentApplicationsController {
  constructor(
    private readonly recruitmentApplicationsService: RecruitmentApplicationsService,
  ) {}

  @Post()
  create(@Body() createDto: CreateRecruitmentApplicationDto) {
    return this.recruitmentApplicationsService.create(createDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findAll(@Query() queryDto: QueryRecruitmentApplicationDto) {
    return this.recruitmentApplicationsService.findAll(queryDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findOne(@Param() params: MongoIdDto) {
    return this.recruitmentApplicationsService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateRecruitmentApplicationDto,
    @GetUser('userId') userId: string,
  ) {
    return this.recruitmentApplicationsService.update(
      params.id,
      updateDto,
      userId,
    );
  }

  @Patch(':id/status/:status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  updateStatus(
    @Param() params: MongoIdDto,
    @Param('status') status: ApplicationStatus,
    @GetUser('userId') userId: string,
  ) {
    return this.recruitmentApplicationsService.updateStatus(
      params.id,
      status,
      userId,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.recruitmentApplicationsService.remove(params.id);
  }
}
