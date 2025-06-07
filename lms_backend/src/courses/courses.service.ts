import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Course } from './courses.entity';
import { CourseInstructor } from './course-instructors.entity';
import { Section } from './sections.entity';
import { Lecture } from './lectures.entity';
import { Resource } from './resources.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CreateSectionDto } from './dto/create-section.dto';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { PaginationDto, PaginatedResult } from '../common/dto/pagination.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
    @InjectRepository(CourseInstructor)
    private courseInstructorRepository: Repository<CourseInstructor>,
    @InjectRepository(Section)
    private sectionRepository: Repository<Section>,
    @InjectRepository(Lecture)
    private lectureRepository: Repository<Lecture>,
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
  ) {}

  async create(createCourseDto: CreateCourseDto) {
    const course = this.courseRepository.create(createCourseDto);
    return await this.courseRepository.save(course);
  }

  async findAll() {
    return await this.courseRepository.find({
      where: { is_deleted: false },
      relations: ['creator'],
    });
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: { id, is_deleted: false },
      relations: ['creator', 'courseInstructors', 'courseInstructors.user', 'sections'],
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.findOne(id);
    Object.assign(course, updateCourseDto);
    return await this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.findOne(id);
    course.is_deleted = true;
    return await this.courseRepository.save(course);
  }

  async addInstructor(courseId: number, userId: number) {
    const courseInstructor = this.courseInstructorRepository.create({
      course_id: courseId,
      user_id: userId,
    });
    return await this.courseInstructorRepository.save(courseInstructor);
  }

  async createSection(createSectionDto: CreateSectionDto) {
    const section = this.sectionRepository.create(createSectionDto);
    return await this.sectionRepository.save(section);
  }

  async createLecture(createLectureDto: CreateLectureDto) {
    const lecture = this.lectureRepository.create(createLectureDto);
    return await this.lectureRepository.save(lecture);
  }

  async getCourseSections(courseId: number) {
    return await this.sectionRepository.find({
      where: { course_id: courseId, is_deleted: false },
      relations: ['lectures'],
      order: { section_order: 'ASC' },
    });
  }

  async getSectionLectures(sectionId: number) {
    return await this.lectureRepository.find({
      where: { section_id: sectionId, is_deleted: false },
      relations: ['resources'],
    });
  }

  async addResource(lectureId: number, type: string, url: string) {
    const resource = this.resourceRepository.create({
      lecture_id: lectureId,
      type,
      url,
    });
    return await this.resourceRepository.save(resource);
  }

  async findAllPaginated(paginationDto: PaginationDto): Promise<PaginatedResult<Course>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.courseRepository.findAndCount({
      where: { is_deleted: false },
      relations: ['creator'],
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async searchCourses(query: string, paginationDto: PaginationDto): Promise<PaginatedResult<Course>> {
    const { page = 1, limit = 10 } = paginationDto;
    const skip = (page - 1) * limit;

    const [data, total] = await this.courseRepository.findAndCount({
      where: [
        { title: Like(`%${query}%`), is_deleted: false },
        { description: Like(`%${query}%`), is_deleted: false },
        { category: Like(`%${query}%`), is_deleted: false },
      ],
      relations: ['creator'],
      skip,
      take: limit,
      order: { id: 'DESC' },
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}


