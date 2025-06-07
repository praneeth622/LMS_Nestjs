import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssignmentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 'Build a Simple Website' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Create a responsive website using HTML and CSS', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-06-15', required: false })
  @IsOptional()
  @IsDateString()
  due_date?: Date;
}