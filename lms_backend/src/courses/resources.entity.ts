import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Lecture } from './lectures.entity';

@Entity('resources')
export class Resource {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lecture_id: number;

  @Column({ length: 50, nullable: true })
  type: string;

  @Column('text', { nullable: true })
  url: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Lecture, lecture => lecture.resources)
  @JoinColumn({ name: 'lecture_id' })
  lecture: Lecture;
}