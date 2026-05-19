import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { DeleteBudgetResponseDto } from '../dto/delete-budget-response.dto';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';

@Injectable()
export class DeleteBudgetUseCase {
  private readonly logger = new Logger(DeleteBudgetUseCase.name);

  constructor(private readonly budgetRepository: BudgetRepositoryInterface) {}

  async execute(id: string): Promise<DeleteBudgetResponseDto> {
    this.logger.log(`Iniciando exclusão do orçamento - ID: ${id}`);
    
    const existingBudget = await this.budgetRepository.findById(id);

    if (!existingBudget?.id) {
      this.logger.error(`Orçamento não encontrado para exclusão - ID: ${id}`);
      throw new NotFoundException('Budget not found.');
    }

    await this.budgetRepository.delete(id);
    this.logger.log(`Orçamento excluído com sucesso - ID: ${id}`);

    return {
      id,
      deleted: true,
    };
  }
}
