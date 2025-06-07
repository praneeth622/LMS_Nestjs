import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Course } from '../courses/courses.entity';
import { AssignmentSubmission } from './assignment-submissions.entity';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_id: number;

  @Column({ length: 200, nullable: true })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('date', { nullable: true })
  due_date: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => AssignmentSubmission, submission => submission.assignment)
  submissions: AssignmentSubmission[];
}