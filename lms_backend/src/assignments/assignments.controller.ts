import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { GradeAssignmentDto } from './dto/grade-assignment.dto';

@ApiTags('assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({ status: 201, description: 'Assignment created successfully' })
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment by ID' })
  @ApiResponse({ status: 200, description: 'Assignment retrieved successfully' })
  async findOne(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  @Post('submit')
  @ApiOperation({ summary: 'Submit assignment' })
  @ApiResponse({ status: 201, description: 'Assignment submitted successfully' })
  async submit(@Body() submitAssignmentDto: SubmitAssignmentDto) {
    return this.assignmentsService.submit(submitAssignmentDto);
  }

  @Put('grade')
  @ApiOperation({ summary: 'Grade assignment submission' })
  @ApiResponse({ status: 200, description: 'Assignment graded successfully' })
  async grade(@Body() gradeAssignmentDto: GradeAssignmentDto) {
    return this.assignmentsService.grade(gradeAssignmentDto);
  }
}
