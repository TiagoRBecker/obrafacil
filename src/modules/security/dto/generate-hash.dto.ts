import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GenerateHashDto {
  @IsString()
  value!: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(4)
  saltRounds?: number;
}
