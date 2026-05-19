import { Injectable, Logger } from '@nestjs/common';

import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { BudgetEntity } from '../entity/budget.entity';

@Injectable()
export class FindAllBudgetsUseCase {
  private readonly logger = new Logger(FindAllBudgetsUseCase.name);

  constructor(private readonly budgetRepository: BudgetRepositoryInterface) {}

  async execute(): Promise<BudgetEntity[]> {
    this.logger.log('Buscando todos os orçamentos');
    const budgets = await this.budgetRepository.findAll();
    this.logger.log(`Encontrados ${budgets.length} orçamentos`);
    return budgets;
  }
}
