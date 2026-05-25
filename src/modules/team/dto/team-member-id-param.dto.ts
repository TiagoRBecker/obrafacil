import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TeamMemberIdParamDto {
  @ApiProperty({ description: 'ID único do membro da equipe', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @MinLength(1)
  id!: string;
}
