import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { Course } from './courses.entity';
import { CourseInstructor } from './course-instructors.entity';
import { Section } from './sections.entity';
import { Lecture } from './lectures.entity';
import { Resource } from './resources.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseInstructor, Section, Lecture, Resource])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService, TypeOrmModule]
})
export class CoursesModule {}
