import { IsString, IsOptional, IsNumber, IsDecimal } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to Web Development' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Learn the basics of web development', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 99.99, required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ example: 'Programming', required: false })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  created_by: number;

  @ApiProperty({ example: 'published', required: false })
  @IsOptional()
  @IsString()
  status?: string;
}