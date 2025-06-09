import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateLectureDto } from './dto/create-lecture.dto';

@ApiTags('lectures')
@Controller('lectures')
export class LecturesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lecture' })
  @ApiResponse({ status: 201, description: 'Lecture created successfully' })
  async createLecture(@Body() createLectureDto: CreateLectureDto) {
    return this.coursesService.createLecture(createLectureDto);
  }

  @Post(':id/resources')
  @ApiOperation({ summary: 'Add resource to lecture' })
  @ApiResponse({ status: 201, description: 'Resource added successfully' })
  async addResource(
    @Param('id') id: string,
    @Body() resourceDto: { type: string; url: string }
  ) {
    return this.coursesService.addResource(+id, resourceDto.type, resourceDto.url);
  }
}