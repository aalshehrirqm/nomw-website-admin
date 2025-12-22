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
import { LegalConsultationsService } from './legal-consultations.service';
import { CreateLegalConsultationDto } from './dto/create-legal-consultation.dto';
import { UpdateLegalConsultationDto } from './dto/update-legal-consultation.dto';
import { QueryLegalConsultationDto } from './dto/query-legal-consultation.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';

@Controller({ path: 'legal-consultations', version: '1' })
export class LegalConsultationsController {
  constructor(
    private readonly legalConsultationsService: LegalConsultationsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  create(
    @Body() createDto: CreateLegalConsultationDto,
    @GetUser('userId') userId: string,
  ) {
    return this.legalConsultationsService.create(createDto, userId);
  }

  @Get()
  findAll(@Query() queryDto: QueryLegalConsultationDto) {
    return this.legalConsultationsService.findAll(queryDto);
  }

  @Get('active')
  findActive(@Query() queryDto: QueryLegalConsultationDto) {
    return this.legalConsultationsService.findActive(queryDto);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.legalConsultationsService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.legalConsultationsService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateLegalConsultationDto,
  ) {
    return this.legalConsultationsService.update(params.id, updateDto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  toggleActive(@Param() params: MongoIdDto) {
    return this.legalConsultationsService.toggleActive(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.legalConsultationsService.remove(params.id);
  }
}
