import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quizzes.entity';
import { QuizQuestion } from './quiz-questions.entity';
import { QuizSubmission } from './quiz-submissions.entity';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(QuizQuestion)
    private questionRepository: Repository<QuizQuestion>,
    @InjectRepository(QuizSubmission)
    private submissionRepository: Repository<QuizSubmission>,
  ) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    const quiz = this.quizRepository.create(createQuizDto);
    return await this.quizRepository.save(quiz);
  }

  async addQuestion(createQuestionDto: CreateQuizQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return await this.questionRepository.save(question);
  }

  async getQuizWithQuestions(id: number) {
    return await this.quizRepository.findOne({
      where: { id, is_deleted: false },
      relations: ['questions'],
    });
  }

  async submitQuiz(submitQuizDto: SubmitQuizDto) {
    // Calculate score logic here
    const quiz = await this.getQuizWithQuestions(submitQuizDto.quiz_id);
    let score = 0;

    if (quiz && quiz.questions) {
      const totalQuestions = quiz.questions.length;
      let correctAnswers = 0;

      quiz.questions.forEach((question) => {
        const userAnswer = submitQuizDto.answers[question.id];
        if (userAnswer === question.correct_answer) {
          correctAnswers++;
        }
      });

      score = (correctAnswers / totalQuestions) * 100;
    }

    const submission = this.submissionRepository.create({
      ...submitQuizDto,
      score,
    });

    return await this.submissionRepository.save(submission);
  }
}
