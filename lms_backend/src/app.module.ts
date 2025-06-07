import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { CoursesModule } from './courses/courses.module';
import { EnrollmentsModule } from './enrollments/enrollments.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { PaymentsModule } from './payments/payments.module';
import { DiscussionsModule } from './discussions/discussions.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-divine-field-a110cdm4-pooler.ap-southeast-1.aws.neon.tech',
      port: 5432,
      username: 'neondb_owner',
      password: 'npg_8jvthGF2cpDm',
      database: 'neondb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false, // Required for Neon DB
      },
    }),
    HealthModule,
    UsersModule, 
    OrganizationsModule, 
    CoursesModule, 
    EnrollmentsModule, 
    QuizzesModule, 
    AssignmentsModule, 
    PaymentsModule, 
    DiscussionsModule, 
    NotificationsModule, 
    AuditModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
