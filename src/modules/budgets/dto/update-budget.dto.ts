import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-budget.dto';
import { IsString } from 'class-validator';

export class UpdateBudgetDto extends PartialType(CreateOrderDto) {
  @IsString()
  id;
}
