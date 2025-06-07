import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Quiz } from './quizzes.entity';

@Entity('quiz_submissions')
export class QuizSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  quiz_id: number;

  @Column('jsonb', { nullable: true })
  answers: any;

  @Column('decimal', { precision: 5, scale: 2, nullable: true })
  score: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Quiz, quiz => quiz.submissions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;
}