import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { Quiz } from './quizzes.entity';
import { QuizQuestion } from './quiz-questions.entity';
import { QuizSubmission } from './quiz-submissions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, QuizQuestion, QuizSubmission])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
  exports: [QuizzesService, TypeOrmModule]
})
export class QuizzesModule {}
