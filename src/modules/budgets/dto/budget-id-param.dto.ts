import { IsString, MinLength } from 'class-validator';

export class BudgetIdParamDto {
  @IsString()
  @MinLength(1)
  id!: string;
}
