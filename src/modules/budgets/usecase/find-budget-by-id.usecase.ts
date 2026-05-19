import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { BudgetResponseDto } from '../dto/budget-response.dto';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { BudgetMapper } from './budget.mapper';
import { BudgetEntity } from '../entity/budget.entity';

@Injectable()
export class FindBudgetByIdUseCase {
  private readonly logger = new Logger(FindBudgetByIdUseCase.name);

  constructor(private readonly budgetRepository: BudgetRepositoryInterface) {}

  async execute(id: string): Promise<BudgetEntity> {
    this.logger.log(`Buscando orçamento por ID: ${id}`);
    const budget = await this.budgetRepository.findById(id);

    if (!budget) {
      this.logger.error(`Orçamento não encontrado - ID: ${id}`);
      throw new NotFoundException('Budget not found.');
    }

    this.logger.log(`Orçamento encontrado - ID: ${id}`);
    return budget
  }
}
