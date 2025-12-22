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
    UseInterceptors,
    UploadedFile,
    HttpStatus,
    HttpCode,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InvestmentOpportunityContentService } from './investment-opportunity-content.service';
import { CreateInvestmentOpportunityContentDto } from './dto/create-investment-opportunity-content.dto';
import { UpdateInvestmentOpportunityContentDto } from './dto/update-investment-opportunity-content.dto';
import { QueryInvestmentOpportunityContentDto } from './dto/query-investment-opportunity-content.dto';

@Controller({ path: 'investment-opportunity-content', version: '1' })
export class InvestmentOpportunityContentController {
    constructor(
        private readonly service: InvestmentOpportunityContentService,
    ) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() query: QueryInvestmentOpportunityContentDto) {
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
                destination: './uploads/investment-opportunities',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
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
        @Body() createDto: CreateInvestmentOpportunityContentDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        if (file) {
            // Save only the relative path - schema toJSON will add the base URL
            createDto.image = `/uploads/investment-opportunities/${file.filename}`;
        }

        return this.service.create(createDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/investment-opportunities',
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
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
        @Param('id') id: string,
        @Body() updateDto: UpdateInvestmentOpportunityContentDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        if (file) {
            // Save only the relative path - schema toJSON will add the base URL
            updateDto.image = `/uploads/investment-opportunities/${file.filename}`;
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
