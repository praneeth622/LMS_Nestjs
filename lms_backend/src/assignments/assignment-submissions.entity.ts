import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Assignment } from './assignments.entity';
import { User } from '../users/users.entity';

@Entity('assignment_submissions')
export class AssignmentSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  assignment_id: number;

  @Column()
  user_id: number;

  @Column('text', { nullable: true })
  submission_url: string;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  grade: number;

  @ManyToOne(() => Assignment, assignment => assignment.submissions)
  @JoinColumn({ name: 'assignment_id' })
  assignment: Assignment;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}