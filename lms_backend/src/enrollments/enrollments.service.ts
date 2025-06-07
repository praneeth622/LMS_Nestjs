import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Enrollment } from './enrollments.entity';
import { Certificate } from './certificates.entity';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { CreateCertificateDto } from './dto/create-certificate.dto';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private enrollmentRepository: Repository<Enrollment>,
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  async createEnrollment(createEnrollmentDto: CreateEnrollmentDto) {
    // Check if already enrolled
    const existingEnrollment = await this.enrollmentRepository.findOne({
      where: {
        user_id: createEnrollmentDto.user_id,
        course_id: createEnrollmentDto.course_id,
      },
    });

    if (existingEnrollment) {
      throw new ConflictException('User is already enrolled in this course');
    }

    const enrollment = this.enrollmentRepository.create(createEnrollmentDto);
    return await this.enrollmentRepository.save(enrollment);
  }

  async updateProgress(updateProgressDto: UpdateProgressDto) {
    const enrollment = await this.enrollmentRepository.findOne({
      where: {
        user_id: updateProgressDto.user_id,
        course_id: updateProgressDto.course_id,
      },
    });

    if (!enrollment) {
      throw new NotFoundException('Enrollment not found');
    }

    enrollment.progress = updateProgressDto.progress;
    const updatedEnrollment = await this.enrollmentRepository.save(enrollment);

    // Auto-generate certificate if progress is 100%
    if (updateProgressDto.progress >= 100) {
      await this.generateCertificate({
        user_id: updateProgressDto.user_id,
        course_id: updateProgressDto.course_id,
      });
    }

    return updatedEnrollment;
  }

  async generateCertificate(createCertificateDto: CreateCertificateDto) {
    // Check if certificate already exists
    const existingCertificate = await this.certificateRepository.findOne({
      where: {
        user_id: createCertificateDto.user_id,
        course_id: createCertificateDto.course_id,
      },
    });

    if (existingCertificate) {
      return existingCertificate;
    }

    const certificate = this.certificateRepository.create({
      ...createCertificateDto,
      issued_on: new Date(),
    });

    return await this.certificateRepository.save(certificate);
  }

  async getUserEnrollments(userId: number) {
    return await this.enrollmentRepository.find({
      where: { user_id: userId },
      relations: ['course'],
    });
  }

  async getUserCertificates(userId: number) {
    return await this.certificateRepository.find({
      where: { user_id: userId },
      relations: ['course'],
    });
  }

  async getCourseEnrollments(courseId: number) {
    return await this.enrollmentRepository.find({
      where: { course_id: courseId },
      relations: ['user'],
    });
  }
}
