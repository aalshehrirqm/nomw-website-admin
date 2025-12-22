import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { OrganizationalStructureService } from './organizational-structure.service';
import { CreateOrganizationalStructureDto } from './dto/create-organizational-structure.dto';
import { UpdateOrganizationalStructureDto } from './dto/update-organizational-structure.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from 'src/database/schemas/user.schema';
import { AllowedTo } from '../../auth/decorators/roles.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { MongoIdDto } from '../../../common/dto/mongo-id.dto';

@Controller({ path: 'organizational-structure', version: '1' })
export class OrganizationalStructureController {
  constructor(
    private readonly orgStructureService: OrganizationalStructureService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image_ar', maxCount: 1 },
        { name: 'image_en', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(
              null,
              `org-structure-${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
            );
          },
        }),
      },
    ),
  )
  create(
    @Body() createDto: CreateOrganizationalStructureDto,
    @UploadedFiles()
    files: {
      image_ar?: Express.Multer.File[];
      image_en?: Express.Multer.File[];
    },
    @GetUser('id') userId: string,
  ) {
    const imageArPath = files.image_ar
      ? `/uploads/${files.image_ar[0].filename}`
      : '';
    const imageEnPath = files.image_en
      ? `/uploads/${files.image_en[0].filename}`
      : '';
    return this.orgStructureService.create(
      createDto,
      imageArPath,
      imageEnPath,
      userId,
    );
  }

  @Get('active')
  findActive() {
    return this.orgStructureService.getOrCreate();
  }

  @Get(':id')
  findOne(@Param() params: MongoIdDto) {
    return this.orgStructureService.findOne(params.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image_ar', maxCount: 1 },
        { name: 'image_en', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(
              null,
              `org-structure-${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
            );
          },
        }),
      },
    ),
  )
  update(
    @Param() params: MongoIdDto,
    @Body() updateDto: UpdateOrganizationalStructureDto,
    @UploadedFiles()
    files: {
      image_ar?: Express.Multer.File[];
      image_en?: Express.Multer.File[];
    },
  ) {
    const imageArPath = files?.image_ar
      ? `/uploads/${files.image_ar[0].filename}`
      : undefined;
    const imageEnPath = files?.image_en
      ? `/uploads/${files.image_en[0].filename}`
      : undefined;
    return this.orgStructureService.update(
      params.id,
      updateDto,
      imageArPath,
      imageEnPath,
    );
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @AllowedTo(UserRole.ADMIN, UserRole.CONTENT_MANAGER)
  toggleActive(@Param() params: MongoIdDto) {
    return this.orgStructureService.toggleActive(params.id);
  }
}
