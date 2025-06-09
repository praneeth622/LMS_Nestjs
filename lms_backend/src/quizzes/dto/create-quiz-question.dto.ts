import { IsString, IsNumber, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizQuestionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  quiz_id: number;

  @ApiProperty({ example: 'What does HTML stand for?' })
  @IsString()
  question_text: string;

  @ApiProperty({ example: 'multiple_choice' })
  @IsString()
  type: string;

  @ApiProperty({ 
    example: ['HyperText Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
    required: false
  })
  @IsOptional()
  @IsObject()
  options?: any;

  @ApiProperty({ example: 'HyperText Markup Language' })
  @IsString()
  correct_answer: string;
}