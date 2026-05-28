import { BudgetEntity } from '../entity/budget.entity';

export interface PaginatedBudgets {
  data: BudgetEntity[];
  total: number;
}

export abstract class BudgetRepositoryInterface {
  abstract create(budget: BudgetEntity): Promise<BudgetEntity>;
  abstract update(id: string, budget: BudgetEntity): Promise<BudgetEntity>;
  abstract updateStatus(id: string): Promise<void>;
  abstract findById(id: string): Promise<BudgetEntity | null>;
  abstract findByCustomerAndStartDate(
    customerId: string,
    date: string,
  ): Promise<BudgetEntity | null>;
  abstract findAll(skip: number, take: number): Promise<PaginatedBudgets>;
  abstract delete(id: string): Promise<void>;
  abstract createTrackingMessage(
    messageId: string,
    orderId: string,
  ): Promise<void>;
  abstract findMessageTracking(
    messageId: string,
  ): Promise<{ id: number; orderId: string; messageId: string } | null>;
}
