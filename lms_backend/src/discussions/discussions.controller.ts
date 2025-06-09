import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('discussions')
@Controller('discussions')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new discussion' })
  @ApiResponse({ status: 201, description: 'Discussion created successfully' })
  async create(@Body() createDiscussionDto: CreateDiscussionDto) {
    return this.discussionsService.create(createDiscussionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discussions' })
  @ApiResponse({ status: 200, description: 'Discussions retrieved successfully' })
  async findAll(@Query('course_id') courseId?: string) {
    if (courseId) {
      return this.discussionsService.findByCourse(+courseId);
    }
    return this.discussionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get discussion by ID' })
  @ApiResponse({ status: 200, description: 'Discussion retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.discussionsService.findOne(+id);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get discussions by course' })
  @ApiResponse({ status: 200, description: 'Course discussions retrieved successfully' })
  async findByCourse(@Param('courseId') courseId: string) {
    return this.discussionsService.findByCourse(+courseId);
  }
}
