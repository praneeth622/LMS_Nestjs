import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from './courses.entity';
import { User } from '../users/users.entity';

@Entity('course_instructors')
export class CourseInstructor {
  @PrimaryColumn()
  course_id: number;

  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => Course, course => course.courseInstructors)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}