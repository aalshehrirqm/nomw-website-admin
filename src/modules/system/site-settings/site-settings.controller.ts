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
import { SiteSettingsService } from './site-settings.service';
import { CreateSiteSettingDto } from './dto/create-site-setting.dto';
import { UpdateSiteSettingDto } from './dto/update-site-setting.dto';
import { QuerySiteSettingDto } from './dto/query-site-setting.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';

@Controller({ path: 'site-settings', version: '1' })
export class SiteSettingsController {
  constructor(private readonly siteSettingsService: SiteSettingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  create(
    @Body() createDto: CreateSiteSettingDto,
    @GetUser('userId') userId: string,
  ) {
    return this.siteSettingsService.create(createDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findAll(@Query() queryDto: QuerySiteSettingDto) {
    return this.siteSettingsService.findAll(queryDto);
  }

  @Get('all-as-object')
  getAllAsObject() {
    return this.siteSettingsService.getAllAsObject();
  }

  @Get('category/:category')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findByCategory(@Param('category') category: string) {
    return this.siteSettingsService.findByCategory(category);
  }

  @Get('key/:key')
  findByKey(@Param('key') key: string) {
    return this.siteSettingsService.findByKey(key);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findOne(@Param() params: MongoIdDto) {
    return this.siteSettingsService.findOne(params.id);
  }

  @Patch('key/:key')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  updateByKey(
    @Param('key') key: string,
    @Body('value') value: any,
    @GetUser('userId') userId: string,
  ) {
    return this.siteSettingsService.updateByKey(key, value, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateSiteSettingDto,
    @GetUser('userId') userId: string,
  ) {
    return this.siteSettingsService.update(params.id, updateDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.siteSettingsService.remove(params.id);
  }
}
