import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignments.entity';
import { AssignmentSubmission } from './assignment-submissions.entity';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto';
import { GradeAssignmentDto } from './dto/grade-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(AssignmentSubmission)
    private submissionRepository: Repository<AssignmentSubmission>,
  ) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const assignment = this.assignmentRepository.create(createAssignmentDto);
    return await this.assignmentRepository.save(assignment);
  }

  async findOne(id: number) {
    const assignment = await this.assignmentRepository.findOne({
      where: { id, is_deleted: false },
      relations: ['course', 'submissions'],
    });

    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return assignment;
  }

  async submit(submitAssignmentDto: SubmitAssignmentDto) {
    const submission = this.submissionRepository.create(submitAssignmentDto);
    return await this.submissionRepository.save(submission);
  }

  async grade(gradeAssignmentDto: GradeAssignmentDto) {
    const submission = await this.submissionRepository.findOne({
      where: { id: gradeAssignmentDto.submission_id },
    });

    if (!submission) {
      throw new NotFoundException('Submission not found');
    }

    submission.grade = gradeAssignmentDto.grade;
    return await this.submissionRepository.save(submission);
  }
}
