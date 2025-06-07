import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Course } from '../courses/courses.entity';
import { QuizQuestion } from './quiz-questions.entity';
import { QuizSubmission } from './quiz-submissions.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_id: number;

  @Column({ length: 200, nullable: true })
  title: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => QuizQuestion, question => question.quiz)
  questions: QuizQuestion[];

  @OneToMany(() => QuizSubmission, submission => submission.quiz)
  submissions: QuizSubmission[];
}