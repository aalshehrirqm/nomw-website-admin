import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CompanyOverviewService } from './company-overview.service';
import { CreateCompanyOverviewDto } from './dto/create-company-overview.dto';
import { UpdateCompanyOverviewDto } from './dto/update-company-overview.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('company-overview')
export class CompanyOverviewController {
  constructor(
    private readonly companyOverviewService: CompanyOverviewService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDto: CreateCompanyOverviewDto, @Request() req) {
    return this.companyOverviewService.create(createDto, req.user.userId);
  }

  @Get()
  findAll() {
    return this.companyOverviewService.findAll();
  }

  @Get('active')
  findActive() {
    return this.companyOverviewService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyOverviewService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCompanyOverviewDto,
    @Request() req,
  ) {
    return this.companyOverviewService.update(id, updateDto, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.companyOverviewService.remove(id);
  }
}
