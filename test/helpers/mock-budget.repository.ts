import { Injectable } from '@nestjs/common';

import { TypeCharge } from '../../src/modules/budgets/dto/create-budget.dto';
import { BudgetEntity } from '../../src/modules/budgets/entity/budget.entity';
import { BudgetRepositoryInterface, PaginatedBudgets } from '../../src/modules/budgets/repo/budget.repository.interface';

const DEFAULT_BUDGETS: BudgetEntity[] = [
  BudgetEntity.toDTO({
    id: 'budget-1',
    name: 'Roberto Almeida',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123',
    observations: 'Client prefers morning visits',
    title: 'Residential Electrical Installation',
    description: 'Complete electrical installation for a 120m² residence.',
    initDate: new Date('2026-03-01'),
    endDate: new Date('2026-03-30'),
    validityDate: new Date('2026-04-05'),
    typeCharge: 'HORA',
    estimatedHours: 16,
    valueHour: 120,
    numberEmployees: 2,
    totalValue: 123,
    laborValue: 123,
    materialValue: 123,
    customerId: 'customer-1',
    materials: [
      { name: 'Circuit breaker', unit: 'un', quantity: 4, unitPrice: 35 },
    ],
    discount: 50,
    finalObservations: 'Payment in two installments.',
    createdAt: new Date('2026-03-01'),
  }),
];

@Injectable()
export class MockBudgetRepository implements BudgetRepositoryInterface {
  private readonly budgets: Map<string, BudgetEntity>;

  constructor() {
    this.budgets = new Map(DEFAULT_BUDGETS.map((b) => [b.id, b]));
  }

  async create(budget: BudgetEntity): Promise<BudgetEntity> {
    const id = `budget-${Date.now()}`;
    const stored = BudgetEntity.toDTO({
      ...budget.toJSON(),
      id,
      createdAt: new Date(),
    });
    this.budgets.set(id, stored);
    return stored;
  }

  async update(id: string, budget: BudgetEntity): Promise<BudgetEntity> {
    const stored = BudgetEntity.toDTO({
      ...budget.toJSON(),
      id,
    });
    this.budgets.set(id, stored);
    return stored;
  }

  async findById(id: string): Promise<BudgetEntity | null> {
    return this.budgets.get(id) ?? null;
  }

  async findAll(skip: number, take: number): Promise<PaginatedBudgets> {
    const values = [...this.budgets.values()];
    return {
      data: values.slice(skip, skip + take),
      total: values.length,
    };
  }

  async findByCustomerAndStartDate(customerId: string, date: string): Promise<BudgetEntity | null> {
    return null;
  }

  async findMessageTracking(messageId: string): Promise<{ id: number; orderId: string; messageId: string } | null> {
    throw new Error('not');
  }

  async createTrackingMessage(messageId: string, orderId: string): Promise<void> {
    throw new Error('');
  }

  async delete(id: string): Promise<void> {
    this.budgets.delete(id);
  }

  async updateStatus(id: string): Promise<void> {
    throw new Error('');
  }
}
