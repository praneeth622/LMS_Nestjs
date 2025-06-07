import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './assignments.entity';
import { AssignmentSubmission } from './assignment-submissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, AssignmentSubmission])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [AssignmentsService, TypeOrmModule]
})
export class AssignmentsModule {}
