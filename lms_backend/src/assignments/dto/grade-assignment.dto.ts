import { IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GradeAssignmentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  submission_id: number;

  @ApiProperty({ example: 85.5, minimum: 0, maximum: 100 })
  @IsNumber()
  @Min(0)
  @Max(100)
  grade: number;
}