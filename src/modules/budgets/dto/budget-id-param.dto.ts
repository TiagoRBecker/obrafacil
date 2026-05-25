import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class BudgetIdParamDto {
  @ApiProperty({ description: 'ID único do orçamento', example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsString()
  @MinLength(1)
  id!: string;
}
