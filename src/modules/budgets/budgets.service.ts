import { Injectable } from '@nestjs/common';

import { BudgetResponseDto } from './dto/budget-response.dto';
import { CreateOrderDto } from './dto/create-budget.dto';
import { DeleteBudgetResponseDto } from './dto/delete-budget-response.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { CreateBudgetUseCase } from './usecase/create-budget.usecase';
import { DeleteBudgetUseCase } from './usecase/delete-budget.usecase';
import { FindAllBudgetsUseCase } from './usecase/find-all-budgets.usecase';
import { FindBudgetByIdUseCase } from './usecase/find-budget-by-id.usecase';
import { UpdateBudgetUseCase } from './usecase/update-budget.usecase';
import { BudgetEntity } from './entity/budget.entity';

@Injectable()
export class BudgetsService {
  constructor(
    private readonly createBudgetUseCase: CreateBudgetUseCase,
    private readonly updateBudgetUseCase: UpdateBudgetUseCase,
    private readonly findBudgetByIdUseCase: FindBudgetByIdUseCase,
    private readonly findAllBudgetsUseCase: FindAllBudgetsUseCase,
    private readonly deleteBudgetUseCase: DeleteBudgetUseCase,
  ) {}

  create(input: CreateOrderDto): Promise<BudgetEntity> {
    return this.createBudgetUseCase.execute(input);
  }

  update(id: string, input: CreateOrderDto): Promise<BudgetEntity> {
    return this.updateBudgetUseCase.execute(id, input);
  }

  findById(id: string): Promise<BudgetEntity> {
    return this.findBudgetByIdUseCase.execute(id);
  }

  findAll(): Promise<BudgetEntity[]> {
    return this.findAllBudgetsUseCase.execute();
  }

  delete(id: string): Promise<DeleteBudgetResponseDto> {
    return this.deleteBudgetUseCase.execute(id);
  }
}
