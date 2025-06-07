import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateLectureDto } from './dto/create-lecture.dto';

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'Course created successfully' })
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Courses retrieved successfully' })
  async findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiResponse({ status: 200, description: 'Course retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update course' })
  @ApiResponse({ status: 200, description: 'Course updated successfully' })
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.coursesService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete course' })
  @ApiResponse({ status: 200, description: 'Course deleted successfully' })
  async remove(@Param('id') id: string) {
    return this.coursesService.remove(+id);
  }

  @Post(':id/instructors/:userId')
  @ApiOperation({ summary: 'Add instructor to course' })
  @ApiResponse({ status: 201, description: 'Instructor added successfully' })
  async addInstructor(@Param('id') id: string, @Param('userId') userId: string) {
    return this.coursesService.addInstructor(+id, +userId);
  }

  @Post('sections')
  @ApiOperation({ summary: 'Create a new section' })
  @ApiResponse({ status: 201, description: 'Section created successfully' })
  async createSection(@Body() createSectionDto: CreateSectionDto) {
    return this.coursesService.createSection(createSectionDto);
  }

  @Post('lectures')
  @ApiOperation({ summary: 'Create a new lecture' })
  @ApiResponse({ status: 201, description: 'Lecture created successfully' })
  async createLecture(@Body() createLectureDto: CreateLectureDto) {
    return this.coursesService.createLecture(createLectureDto);
  }

  @Get(':id/sections')
  @ApiOperation({ summary: 'Get course sections' })
  @ApiResponse({ status: 200, description: 'Sections retrieved successfully' })
  async getCourseSections(@Param('id') id: string) {
    return this.coursesService.getCourseSections(+id);
  }

  @Get('sections/:id/lectures')
  @ApiOperation({ summary: 'Get section lectures' })
  @ApiResponse({ status: 200, description: 'Lectures retrieved successfully' })
  async getSectionLectures(@Param('id') id: string) {
    return this.coursesService.getSectionLectures(+id);
  }
}
