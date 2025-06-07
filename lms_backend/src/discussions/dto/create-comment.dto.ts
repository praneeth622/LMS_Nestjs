import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  discussion_id: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: 'You can use HTML tags like <p> for paragraphs.' })
  @IsString()
  comment_text: string;
}