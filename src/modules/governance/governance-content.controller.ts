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
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GovernanceContentService } from './governance-content.service';
import { CreateGovernanceContentDto } from './dto/create-governance-content.dto';
import { UpdateGovernanceContentDto } from './dto/update-governance-content.dto';
import { QueryGovernanceContentDto } from './dto/query-governance-content.dto';

@Controller({ path: 'governance-content', version: '1' })
export class GovernanceContentController {
    constructor(private readonly service: GovernanceContentService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Query() query: QueryGovernanceContentDto) {
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
    create(@Body() createDto: CreateGovernanceContentDto) {
        return this.service.create(createDto);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateDto: UpdateGovernanceContentDto) {
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
