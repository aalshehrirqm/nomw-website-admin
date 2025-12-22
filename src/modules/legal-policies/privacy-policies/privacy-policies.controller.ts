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
import { PrivacyPoliciesService } from './privacy-policies.service';
import { CreatePrivacyPolicyDto } from './dto/create-privacy-policy.dto';
import { UpdatePrivacyPolicyDto } from './dto/update-privacy-policy.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Controller({ path: 'privacy-policies', version: '1' })
export class PrivacyPoliciesController {
  constructor(
    private readonly privacyPoliciesService: PrivacyPoliciesService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  create(
    @Body() createDto: CreatePrivacyPolicyDto,
    @GetUser('userId') userId: string,
  ) {
    return this.privacyPoliciesService.create(createDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  findAll(@Query() paginationDto: PaginationDto) {
    return this.privacyPoliciesService.findAll(paginationDto);
  }

  @Get('active')
  findActive() {
    return this.privacyPoliciesService.findActive();
  }

  @Get('latest')
  findLatest() {
    return this.privacyPoliciesService.findLatest();
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.privacyPoliciesService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdatePrivacyPolicyDto,
  ) {
    return this.privacyPoliciesService.update(params.id, updateDto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  toggleActive(@Param() params: MongoIdDto) {
    return this.privacyPoliciesService.toggleActive(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.privacyPoliciesService.remove(params.id);
  }
}
