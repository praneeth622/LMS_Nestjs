import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscussionsService } from './discussions.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Post()
  @ApiOperation({ summary: 'Add comment to discussion' })
  @ApiResponse({ status: 201, description: 'Comment added successfully' })
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.discussionsService.addComment(createCommentDto);
  }

  @Get('discussion/:discussionId')
  @ApiOperation({ summary: 'Get comments for discussion' })
  @ApiResponse({ status: 200, description: 'Comments retrieved successfully' })
  async findByDiscussion(@Param('discussionId') discussionId: string) {
    return this.discussionsService.getDiscussionComments(+discussionId);
  }
}