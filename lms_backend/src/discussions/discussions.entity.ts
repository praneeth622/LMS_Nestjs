import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Course } from '../courses/courses.entity';
import { Lecture } from '../courses/lectures.entity';
import { User } from '../users/users.entity';
import { Comment } from './comments.entity';

@Entity('discussions')
export class Discussion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_id: number;

  @Column({ nullable: true })
  lecture_id: number;

  @Column()
  user_id: number;

  @Column({ length: 200, nullable: true })
  title: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => Lecture)
  @JoinColumn({ name: 'lecture_id' })
  lecture: Lecture;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Comment, comment => comment.discussion)
  comments: Comment[];
}