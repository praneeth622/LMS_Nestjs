import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';

@ApiTags('resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Attach resource to lecture' })
  @ApiResponse({ status: 201, description: 'Resource attached successfully' })
  async attachResource(@Body() resourceDto: { lecture_id: number; type: string; url: string }) {
    return this.coursesService.addResource(resourceDto.lecture_id, resourceDto.type, resourceDto.url);
  }
}