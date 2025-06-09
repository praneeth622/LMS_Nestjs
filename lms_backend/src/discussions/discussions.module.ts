import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscussionsController } from './discussions.controller';
import { CommentsController } from './comments.controller';
import { DiscussionsService } from './discussions.service';
import { Discussion } from './discussions.entity';
import { Comment } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discussion, Comment])],
  controllers: [DiscussionsController, CommentsController],
  providers: [DiscussionsService],
  exports: [DiscussionsService, TypeOrmModule]
})
export class DiscussionsModule {}
