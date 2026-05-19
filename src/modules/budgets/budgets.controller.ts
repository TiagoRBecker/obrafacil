import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-budget.dto';
import { BudgetIdParamDto } from './dto/budget-id-param.dto';
import { DeleteBudgetResponseDto } from './dto/delete-budget-response.dto';

import { BudgetsService } from './budgets.service';
import { BudgetEntity } from './entity/budget.entity';

@Controller('admin/budgets')

export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post('create')
  create(@Body() body: CreateOrderDto): Promise<BudgetEntity> {
   
     
    return this.budgetsService.create(body);
  }

  @Patch('update/:id')
  update(
    @Param() params: BudgetIdParamDto,
    @Body() body: CreateOrderDto,
  ): Promise<BudgetEntity> {
    return this.budgetsService.update(params.id, body);
  }

  @Delete('delete/:id')
  delete(@Param() params: BudgetIdParamDto): Promise<DeleteBudgetResponseDto> {
    return this.budgetsService.delete(params.id);
  }

  @Get('all')
  findAll(): Promise<BudgetEntity[]> {
    return this.budgetsService.findAll();
  }

  @Get(':id')
  findById(@Param() params: BudgetIdParamDto): Promise<BudgetEntity> {
    return this.budgetsService.findById(params.id);
  }
}
