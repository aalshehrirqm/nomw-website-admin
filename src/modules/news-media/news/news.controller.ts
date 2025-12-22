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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { QueryNewsDto } from './dto/query-news.dto';
import { CreatePreviewDto } from './dto/create-preview.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { UserRole } from 'src/database/schemas/user.schema';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';

@Controller({ path: 'news', version: '1' })
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  // Create news - Admin + Content Manager
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  create(@Body() createDto: CreateNewsDto, @GetUser('userId') userId: string) {
    return this.newsService.create(createDto, userId);
  }

  // Get all news - Public (no auth required)
  @Get()
  findAll(@Query() queryDto: QueryNewsDto) {
    return this.newsService.findAll(queryDto);
  }

  @Get('published')
  findPublished(@Query() queryDto: QueryNewsDto) {
    return this.newsService.findPublished(queryDto);
  }

  @Get('slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.newsService.findBySlug(slug);
  }

  // Get single news - Public (no auth required)
  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.newsService.findOne(params.id);
  }

  // Update news - Admin + Content Manager + Editor
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateNewsDto,
    @GetUser('userId') userId: string,
  ) {
    return this.newsService.update(params.id, updateDto, userId);
  }

  // Toggle publish status - Admin + Content Manager
  @Patch(':id/toggle-publish')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  togglePublish(@Param() params: MongoIdDto) {
    return this.newsService.togglePublish(params.id);
  }

  @Patch(':id/increment-views')
  incrementViews(@Param() params: MongoIdDto) {
    return this.newsService.incrementViews(params.id);
  }

  // Delete news - Admin + Content Manager
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  remove(@Param() params: MongoIdDto, @GetUser('userId') userId: string) {
    return this.newsService.remove(params.id, userId);
  }

  // ========== Preview Endpoints ==========

  // Create preview - Authenticated users
  @Post('preview')
  @UseGuards(JwtAuthGuard)
  createPreview(@Body() createPreviewDto: CreatePreviewDto) {
    const previewId = this.newsService.createPreview(createPreviewDto);
    return { previewId };
  }

  // Get preview - Public (no auth required)
  @Get('preview/:id')
  getPreview(@Param('id') id: string) {
    return this.newsService.getPreview(id);
  }
}
