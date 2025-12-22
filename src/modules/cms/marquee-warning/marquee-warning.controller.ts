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
import { MarqueeWarningService } from './marquee-warning.service';
import { CreateMarqueeWarningDto } from './dto/create-marquee-warning.dto';
import { UpdateMarqueeWarningDto } from './dto/update-marquee-warning.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';

@Controller({ path: 'marquee-warning', version: '1' })
export class MarqueeWarningController {
  constructor(private readonly marqueeWarningService: MarqueeWarningService) { }

  // Create marquee warning - Admin + Content Manager
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  create(@Body() createDto: CreateMarqueeWarningDto, @Request() req) {
    return this.marqueeWarningService.create(createDto, req.user.userId);
  }

  // Get all marquee warnings - Admin + Content Manager
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findAll() {
    return this.marqueeWarningService.findAll();
  }

  @Get('active')
  findActive() {
    return this.marqueeWarningService.findActive();
  }

  // Get single marquee warning - Admin + Content Manager
  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findOne(@Param('id') id: string) {
    return this.marqueeWarningService.findOne(id);
  }

  // Update marquee warning - Admin + Content Manager + Editor
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  update(@Param('id') id: string, @Body() updateDto: UpdateMarqueeWarningDto) {
    return this.marqueeWarningService.update(id, updateDto);
  }

  // Toggle active status - Admin + Content Manager
  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  toggleActive(@Param('id') id: string) {
    return this.marqueeWarningService.toggleActive(id);
  }

  // Delete marquee warning - Admin + Content Manager
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  delete(@Param('id') id: string) {
    return this.marqueeWarningService.delete(id);
  }
}
