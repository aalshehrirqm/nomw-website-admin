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
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { QueryServiceDto } from './dto/query-service.dto';

@Controller({ path: 'services', version: '1' })
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  create(@Body() createDto: CreateServiceDto, @GetUser('id') userId: string) {
    return this.servicesService.create(createDto, userId);
  }

  @Get()
  findAll(@Query() query: QueryServiceDto) {
    return this.servicesService.findAll(query);
  }

  @Get('active')
  findActive() {
    return this.servicesService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.servicesService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  update(@Param() params: MongoIdDto, @Body() updateDto: UpdateServiceDto) {
    return this.servicesService.update(params.id, updateDto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  toggleActive(@Param() params: MongoIdDto) {
    return this.servicesService.toggleActive(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.servicesService.remove(params.id);
  }
}
