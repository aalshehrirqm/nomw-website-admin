import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LegalConsultationService } from './legal-consultation.service';
import { LegalConsultationSectionService } from './legal-consultation-section.service';
import { CreateLegalConsultationItemDto } from './dto/create-legal-consultation-item.dto';
import { UpdateLegalConsultationItemDto } from './dto/update-legal-consultation-item.dto';
import { UpdateLegalConsultationSectionDto } from './dto/update-legal-consultation-section.dto';

@Controller('legal-consultation')
export class LegalConsultationController {
  constructor(
    private readonly consultationService: LegalConsultationService,
    private readonly sectionService: LegalConsultationSectionService,
  ) {}

  // Section Endpoints
  @Get('section/content')
  getSectionContent() {
    return this.sectionService.getOrCreate();
  }

  @Patch('section/content/:id')
  updateSection(
    @Param('id') id: string,
    @Body() updateDto: UpdateLegalConsultationSectionDto,
  ) {
    return this.sectionService.update(id, updateDto);
  }

  // Items Endpoints
  @Post()
  create(@Body() createDto: CreateLegalConsultationItemDto) {
    return this.consultationService.create(createDto);
  }

  @Get()
  findAll() {
    return this.consultationService.findAll();
  }

  @Get('active')
  findActive() {
    return this.consultationService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateLegalConsultationItemDto,
  ) {
    return this.consultationService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.remove(id);
  }

  @Patch(':id/toggle-active')
  toggleActive(@Param('id') id: string) {
    return this.consultationService.toggleActive(id);
  }
}
