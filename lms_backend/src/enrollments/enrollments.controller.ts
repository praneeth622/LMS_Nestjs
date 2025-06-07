import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@ApiTags('enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Enroll user in a course' })
  @ApiResponse({ status: 201, description: 'User enrolled successfully' })
  async createEnrollment(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.createEnrollment(createEnrollmentDto);
  }

  @Put('progress')
  @ApiOperation({ summary: 'Update enrollment progress' })
  @ApiResponse({ status: 200, description: 'Progress updated successfully' })
  async updateProgress(@Body() updateProgressDto: UpdateProgressDto) {
    return this.enrollmentsService.updateProgress(updateProgressDto);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get user enrollments' })
  @ApiResponse({ status: 200, description: 'User enrollments retrieved' })
  async getUserEnrollments(@Param('userId') userId: number) {
    return this.enrollmentsService.getUserEnrollments(userId);
  }

  @Get('certificates/:userId')
  @ApiOperation({ summary: 'Get user certificates' })
  @ApiResponse({ status: 200, description: 'User certificates retrieved' })
  async getUserCertificates(@Param('userId') userId: number) {
    return this.enrollmentsService.getUserCertificates(userId);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get course enrollments' })
  @ApiResponse({ status: 200, description: 'Course enrollments retrieved' })
  async getCourseEnrollments(@Param('courseId') courseId: number) {
    return this.enrollmentsService.getCourseEnrollments(courseId);
  }
}
