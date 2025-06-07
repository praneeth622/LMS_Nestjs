import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Quiz } from './quizzes.entity';

@Entity('quiz_questions')
export class QuizQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quiz_id: number;

  @Column('text', { nullable: true })
  question_text: string;

  @Column({ length: 50, nullable: true })
  type: string;

  @Column('jsonb', { nullable: true })
  options: any;

  @Column('text', { nullable: true })
  correct_answer: string;

  @ManyToOne(() => Quiz, quiz => quiz.questions)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;
}