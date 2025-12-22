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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HeroSectionService } from './hero-section.service';
import { CreateHeroSectionDto } from './dto/create-hero-section.dto';
import { UpdateHeroSectionDto } from './dto/update-hero-section.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Controller({ path: 'hero-sections', version: '1' })
export class HeroSectionController {
  constructor(private readonly heroSectionService: HeroSectionService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  @UseInterceptors(
    FileInterceptor('backgroundImage', {
      storage: diskStorage({
        destination: './uploads/hero-sections',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `hero-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  create(
    @Body() createDto: CreateHeroSectionDto,
    @GetUser('id') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.heroSectionService.create(createDto, userId, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.heroSectionService.findAll(paginationDto);
  }

  @Get('active')
  findActive() {
    return this.heroSectionService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.heroSectionService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  @UseInterceptors(
    FileInterceptor('backgroundImage', {
      storage: diskStorage({
        destination: './uploads/hero-sections',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `hero-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateHeroSectionDto,
    @GetUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.heroSectionService.update(params.id, updateDto, userId, file);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  toggleActive(@Param() params: MongoIdDto) {
    return this.heroSectionService.toggleActive(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN)
  remove(@Param() params: MongoIdDto, @GetUser('userId') userId: string) {
    return this.heroSectionService.remove(params.id, userId);
  }
}
