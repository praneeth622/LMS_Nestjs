import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  imports: [UsersModule, OrganizationsModule, CoursesModule, EnrollmentsModule, QuizzesModule, AssignmentsModule, PaymentsModule, DiscussionsModule, NotificationsModule, AuditModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
