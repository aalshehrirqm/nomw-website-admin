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
import { GovernanceDocumentsService } from './governance-documents.service';
import { CreateGovernanceDocumentDto } from './dto/create-governance-document.dto';
import { UpdateGovernanceDocumentDto } from './dto/update-governance-document.dto';
import { QueryGovernanceDocumentDto } from './dto/query-governance-document.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';

@Controller({ path: 'governance-documents', version: '1' })
export class GovernanceDocumentsController {
  constructor(
    private readonly governanceDocumentsService: GovernanceDocumentsService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  create(
    @Body() createDto: CreateGovernanceDocumentDto,
    @GetUser('userId') userId: string,
  ) {
    return this.governanceDocumentsService.create(createDto, userId);
  }

  @Get()
  findAll(@Query() queryDto: QueryGovernanceDocumentDto) {
    return this.governanceDocumentsService.findAll(queryDto);
  }

  @Get('active')
  findActive(@Query() queryDto: QueryGovernanceDocumentDto) {
    return this.governanceDocumentsService.findActive(queryDto);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.governanceDocumentsService.findByType(type);
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.governanceDocumentsService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateGovernanceDocumentDto,
  ) {
    return this.governanceDocumentsService.update(params.id, updateDto);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  toggleActive(@Param() params: MongoIdDto) {
    return this.governanceDocumentsService.toggleActive(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto) {
    return this.governanceDocumentsService.remove(params.id);
  }
}
