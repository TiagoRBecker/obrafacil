import { Injectable } from '@nestjs/common';

import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from './budget.repository.interface';

@Injectable()
export class InMemoryBudgetRepository implements BudgetRepositoryInterface {
  private readonly budgets = new Map<string, BudgetEntity>();

  async create(budget: BudgetEntity): Promise<BudgetEntity> {
    this.budgets.set("", budget);
    return budget;
  }

  async update(id:string, budget: BudgetEntity): Promise<BudgetEntity> {
    this.budgets.set("", budget);
    return budget;
  }

  async findById(id: string): Promise<BudgetEntity | null> {
    return this.budgets.get(id) ?? null;
  }
  async findByCustomerAndStartDate(customerId: string, date: string): Promise<BudgetEntity | null> {
    throw "not"
  }

  async findAll(): Promise<BudgetEntity[]> {
    return [...this.budgets.values()];
  }
  async createTrackingMessage(messageId: string, orerId: string): Promise<void> {
    throw ""
  }
  async findMessageTracking(messageId: string): Promise<{ id: number; orderId: string; messageId: string; } | null> {
    throw ""
  }
  async delete(id: string): Promise<void> {
    this.budgets.delete(id);
  }
  async updateStatus(id: string): Promise<void> {
    throw ""
  }
}
