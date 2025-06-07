import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from './enrollments.entity';
import { Certificate } from './certificates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Certificate])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService],
  exports: [EnrollmentsService, TypeOrmModule]
})
export class EnrollmentsModule {}
