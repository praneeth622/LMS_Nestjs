import { IsNumber, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitQuizDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  quiz_id: number;

  @ApiProperty({ 
    example: { '1': 'HyperText Markup Language', '2': 'Cascading Style Sheets' }
  })
  @IsObject()
  answers: any;
}