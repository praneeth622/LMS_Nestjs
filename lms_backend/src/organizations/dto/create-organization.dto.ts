import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'Tech University' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'university', required: false })
  @IsOptional()
  @IsString()
  type?: string;
}