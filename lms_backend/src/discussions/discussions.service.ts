import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discussion } from './discussions.entity';
import { Comment } from './comments.entity';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class DiscussionsService {
  constructor(
    @InjectRepository(Discussion)
    private discussionRepository: Repository<Discussion>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createDiscussionDto: CreateDiscussionDto) {
    const discussion = this.discussionRepository.create(createDiscussionDto);
    return await this.discussionRepository.save(discussion);
  }

  async findAll() {
    return await this.discussionRepository.find({
      where: { is_deleted: false },
      relations: ['user', 'course', 'lecture', 'comments'],
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number) {
    const discussion = await this.discussionRepository.findOne({
      where: { id, is_deleted: false },
      relations: ['user', 'course', 'lecture', 'comments', 'comments.user'],
    });

    if (!discussion) {
      throw new NotFoundException('Discussion not found');
    }

    return discussion;
  }

  async findByCourse(courseId: number) {
    return await this.discussionRepository.find({
      where: { course_id: courseId, is_deleted: false },
      relations: ['user', 'lecture', 'comments'],
      order: { id: 'DESC' },
    });
  }

  async addComment(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepository.create(createCommentDto);
    return await this.commentRepository.save(comment);
  }

  async getDiscussionComments(discussionId: number) {
    return await this.commentRepository.find({
      where: { discussion_id: discussionId, is_deleted: false },
      relations: ['user'],
      order: { created_at: 'ASC' },
    });
  }
}
