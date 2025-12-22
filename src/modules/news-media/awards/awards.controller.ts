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
import { AwardsService } from './awards.service';
import { CreateAwardDto } from './dto/create-award.dto';
import { UpdateAwardDto } from './dto/update-award.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { UserRole } from 'src/database/schemas/user.schema';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Controller({ path: 'awards', version: '1' })
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) { }

  // Create award - Admin + Content Manager
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/awards',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `award-${uniqueSuffix}${extname(file.originalname)}`);
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
    @Body() createDto: CreateAwardDto,
    @GetUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.awardsService.create(createDto, userId, file);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.awardsService.findAll(paginationDto);
  }

  @Get('active')
  findActive() {
    return this.awardsService.findActive();
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.awardsService.findOne(params.id);
  }

  // Update award - Admin + Content Manager + Editor
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER, UserRole.EDITOR)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/awards',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `award-${uniqueSuffix}${extname(file.originalname)}`);
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
    @Body() updateDto: UpdateAwardDto,
    @GetUser('userId') userId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.awardsService.update(params.id, updateDto, userId, file);
  }

  // Toggle active status - Admin + Content Manager
  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  toggleActive(@Param() params: MongoIdDto) {
    return this.awardsService.toggleActive(params.id);
  }

  // Delete award - Admin + Content Manager
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  remove(@Param() params: MongoIdDto, @GetUser('userId') userId: string) {
    return this.awardsService.remove(params.id, userId);
  }
}
