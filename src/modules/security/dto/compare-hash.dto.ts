import { IsString } from 'class-validator';

export class CompareHashDto {
  @IsString()
  value!: string;

  @IsString()
  hash!: string;
}
