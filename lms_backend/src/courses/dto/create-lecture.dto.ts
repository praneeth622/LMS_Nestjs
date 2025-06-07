import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLectureDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  section_id: number;

  @ApiProperty({ example: 'Introduction to HTML' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'https://example.com/video.mp4', required: false })
  @IsOptional()
  @IsString()
  video_url?: string;

  @ApiProperty({ example: 1800, description: 'Duration in seconds', required: false })
  @IsOptional()
  @IsNumber()
  duration?: number;
}