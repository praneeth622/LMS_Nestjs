import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 'Chapter 1 Quiz' })
  @IsString()
  title: string;
}