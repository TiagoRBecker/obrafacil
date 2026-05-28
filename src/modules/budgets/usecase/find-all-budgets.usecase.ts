import { Injectable, Logger } from '@nestjs/common';

import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { BudgetEntity } from '../entity/budget.entity';

export interface PaginatedBudgetsResult {
  data: BudgetEntity[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class FindAllBudgetsUseCase {
  private readonly logger = new Logger(FindAllBudgetsUseCase.name);

  constructor(private readonly budgetRepository: BudgetRepositoryInterface) {}

  async execute(page: number = 1, limit: number = 10): Promise<PaginatedBudgetsResult> {
    this.logger.log(`Buscando orçamentos - página: ${page}, limite: ${limit}`);
    const skip = (page - 1) * limit;
    const { data, total } = await this.budgetRepository.findAll(skip, limit);
    this.logger.log(`Encontrados ${total} orçamentos no total, retornando ${data.length}`);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
