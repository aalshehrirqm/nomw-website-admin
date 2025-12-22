import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Delete,
    Param,
    Query,
    UseGuards,
    HttpStatus,
    HttpCode,
    UseInterceptors,
    UploadedFile,
    BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BoardContentService } from './board-content.service';
import { CreateBoardContentDto } from './dto/create-board-content.dto';
import { UpdateBoardContentDto } from './dto/update-board-content.dto';
import { QueryBoardContentDto } from './dto/query-board-content.dto';

@Controller({ path: 'board-content', version: '1' })
export class BoardContentController {
    constructor(private readonly service: BoardContentService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() query: QueryBoardContentDto) {
        return this.service.findAll(query);
    }

    @Get('active')
    findAllActive() {
        return this.service.findAllActive();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/board',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                    return callback(new BadRequestException('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
        }),
    )
    create(@Body() createDto: CreateBoardContentDto, @UploadedFile() file?: Express.Multer.File) {
        if (file) {
            createDto.image = `/uploads/board/${file.filename}`;
        }
        return this.service.create(createDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/board',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
            fileFilter: (req, file, callback) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
                    return callback(new BadRequestException('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
        }),
    )
    update(
        @Param('id') id: string,
        @Body() updateDto: UpdateBoardContentDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        if (file) {
            updateDto.image = `/uploads/board/${file.filename}`;
        }
        return this.service.update(id, updateDto);
    }

    @Patch(':id/toggle-active')
    @UseGuards(JwtAuthGuard)
    toggleActive(@Param('id') id: string) {
        return this.service.toggleActive(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.NO_CONTENT)
    bulkDelete(@Body('ids') ids: string[]) {
        return this.service.bulkDelete(ids);
    }
}
