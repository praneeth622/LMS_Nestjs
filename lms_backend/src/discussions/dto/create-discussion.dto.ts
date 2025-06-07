import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscussionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  lecture_id?: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'Question about HTML basics' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'I need help understanding how to use HTML tags properly.' })
  @IsString()
  content: string;
}