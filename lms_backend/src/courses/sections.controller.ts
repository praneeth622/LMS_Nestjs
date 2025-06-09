import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateSectionDto } from './dto/create-section.dto';

@ApiTags('sections')
@Controller('sections')
export class SectionsController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({ status: 201, description: 'Section created successfully' })
  async createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.coursesService.createSection(createSectionDto);
  }

  @Get(':id/lectures')
  @ApiOperation({ summary: 'Get section lectures' })
  @ApiResponse({ status: 200, description: 'Lectures retrieved successfully' })
  async getSectionLectures(@Param('id') id: string) {
    return this.coursesService.getSectionLectures(+id);
  }
}