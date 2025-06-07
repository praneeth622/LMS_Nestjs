import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Course } from './courses.entity';
import { Lecture } from './lectures.entity';

@Entity('sections')
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  course_id: number;

  @Column({ length: 200, nullable: true })
  title: string;

  @Column({ nullable: true })
  section_order: number;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => Course, course => course.sections)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @OneToMany(() => Lecture, lecture => lecture.section)
  lectures: Lecture[];
}