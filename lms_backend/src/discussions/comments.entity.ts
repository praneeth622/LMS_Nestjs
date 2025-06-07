import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Discussion } from './discussions.entity';
import { User } from '../users/users.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  discussion_id: number;

  @Column()
  user_id: number;

  @Column('text', { nullable: true })
  comment_text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Discussion, discussion => discussion.comments)
  @JoinColumn({ name: 'discussion_id' })
  discussion: Discussion;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}