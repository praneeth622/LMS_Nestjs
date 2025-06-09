import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { SubmitQuizDto } from './dto/submit-quiz.dto';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, description: 'Quiz created successfully' })
  async createQuiz(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.createQuiz(createQuizDto);
  }

  @Post('questions')
  @ApiOperation({ summary: 'Add question to quiz' })
  @ApiResponse({ status: 201, description: 'Question added successfully' })
  async addQuestion(@Body() createQuestionDto: CreateQuizQuestionDto) {
    return this.quizzesService.addQuestion(createQuestionDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz with questions' })
  @ApiResponse({ status: 200, description: 'Quiz retrieved successfully' })
  async getQuiz(@Param('id') id: string) {
    return this.quizzesService.getQuizWithQuestions(+id);
  }

  @Get(':id/questions')
  @ApiOperation({ summary: 'Get quiz questions' })
  @ApiResponse({ status: 200, description: 'Quiz questions retrieved successfully' })
  async getQuizQuestions(@Param('id') id: string) {
    const quiz = await this.quizzesService.getQuizWithQuestions(+id);
    if (!quiz) {
      throw new Error('Quiz not found');
    }
    return quiz.questions;
  }

  @Post(':id/submit')
  @ApiOperation({ summary: 'Submit quiz answers' })
  @ApiResponse({ status: 201, description: 'Quiz submitted successfully' })
  async submitQuiz(@Param('id') id: string, @Body() submitQuizDto: SubmitQuizDto) {
    return this.quizzesService.submitQuiz({ ...submitQuizDto, quiz_id: +id });
  }
}
