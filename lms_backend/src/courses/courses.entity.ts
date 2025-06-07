import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { CourseInstructor } from './course-instructors.entity';
import { Section } from './sections.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200, nullable: true })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ length: 100, nullable: true })
  category: string;

  @Column()
  created_by: number;

  @Column({ length: 50, nullable: true })
  status: string;

  @Column({ type: 'boolean', default: false })
  is_deleted: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @OneToMany(() => CourseInstructor, courseInstructor => courseInstructor.course)
  courseInstructors: CourseInstructor[];

  @OneToMany(() => Section, section => section.course)
  sections: Section[];
}

