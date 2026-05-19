import { Injectable } from '@nestjs/common';

import { TypeCharge } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from './budget.repository.interface';

@Injectable()
export class MockBudgetRepository implements BudgetRepositoryInterface {
  private readonly budgets = new Map<string, BudgetEntity>([
    [
      'budget-1',
      BudgetEntity.create({
        name: 'Roberto Almeida',
        phone: '(11) 99999-9999',
        address: 'Rua das Flores, 123',
        observations: 'Client prefers morning visits',
        title: 'Residential Electrical Installation',
        description: 'Complete electrical installation for a 120m² residence.',
        initDate: new Date(),
        endDate: new Date(),
        validityDate: new Date(),
        typeCharge: TypeCharge.HORA,
        estimatedHours: 16,
        valueHour: 120,
        numberEmployees: 2,
        totalValue: 123,
        laborValue: 123,
        materialValue: 123,
        customerId: '1234567',

        materials: [
          {
            name: 'Circuit breaker',
            unit: 'un',
            quantity: 4,
            unitPrice: 35,
          },
        ],
        discount: 50,
        finalObservations: 'Payment in two installments.',
      }),
    ],
  ]);

  async create(budget: BudgetEntity): Promise<BudgetEntity> {
    this.budgets.set('budget-1', budget);
    return budget;
  }

  async update(id: string, budget: BudgetEntity): Promise<BudgetEntity> {
    this.budgets.set('budget-1', budget);
    return budget;
  }

  async findById(id: string): Promise<BudgetEntity | null> {
    return this.budgets.get(id) ?? null;
  }

  async findAll(): Promise<BudgetEntity[]> {
    return [...this.budgets.values()];
  }
  async findByCustomerAndStartDate(
    customerId: string,
    date: string,
  ): Promise<BudgetEntity | null> {
    throw 'not';
  }
  async findMessageTracking(
    messageId: string,
  ): Promise<{ id: number; orderId: string; messageId: string } | null> {
    throw 'not';
  }
  async createTrackingMessage(
    messageId: string,
    orerId: string,
  ): Promise<void> {
    throw '';
  }
  async delete(id: string): Promise<void> {
    this.budgets.delete(id);
  }
  async updateStatus(id: string): Promise<void> {
    throw '';
  }
}
