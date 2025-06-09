import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  course_id: number;

  @ApiProperty({ example: 'Introduction to HTML' })
  @IsString()
  title: string;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  section_order?: number;
}