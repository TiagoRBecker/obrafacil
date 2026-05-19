import 'reflect-metadata';

import { NotFoundException } from '@nestjs/common';

import { BudgetBillingType } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepository } from '../repo/budget.repository.interface';
import { UpdateBudgetUseCase } from '../usecase/update-budget.usecase';

type BudgetRepositoryMock = jest.Mocked<BudgetRepository>;

function createRepositoryMock(): BudgetRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  };
}

describe('UpdateBudgetUseCase', () => {
  let budgetRepository: BudgetRepositoryMock;
  let useCase: UpdateBudgetUseCase;

  beforeEach(() => {
    budgetRepository = createRepositoryMock();
    useCase = new UpdateBudgetUseCase(budgetRepository);
  });

  it('should update a budget successfully', async () => {
    const existingBudget = BudgetEntity.create({
      id: 'budget-1',
      customerName: 'Roberto Almeida',
      customerPhone: '(11) 99999-9999',
      customerAddress: 'Rua A',
      customerNotes: 'Old notes',
      title: 'Old title',
      description: 'Old description',
      startDate: '2026-03-25',
      endDate: '2026-03-30',
      validityDate: '2026-04-05',
      billingType: BudgetBillingType.HOUR,
      estimatedQuantity: 10,
      rateAmount: 100,
      professionalsCount: 1,
      materials: [
        {
          name: 'Wire',
          unit: 'm',
          quantity: 20,
          unitPrice: 3,
        },
      ],
      discount: 0,
      finalNotes: 'Old final notes',
      createdAt: new Date('2026-03-01T10:00:00.000Z'),
      updatedAt: new Date('2026-03-01T10:00:00.000Z'),
    });

    budgetRepository.findById.mockResolvedValue(existingBudget);
    budgetRepository.update.mockImplementation(async (budget) => budget);

    const result = await useCase.execute('budget-1', {
      customerName: 'Roberto Silva',
      customerPhone: '(11) 98888-7777',
      customerAddress: 'Rua B',
      customerNotes: 'New notes',
      title: 'Updated budget',
      description: 'Updated description',
      startDate: '2026-03-26',
      endDate: '2026-03-31',
      validityDate: '2026-04-10',
      billingType: BudgetBillingType.SERVICE,
      estimatedQuantity: 1,
      rateAmount: 2000,
      professionalsCount: 2,
      materials: [
        {
          name: 'Panel',
          unit: 'un',
          quantity: 1,
          unitPrice: 500,
        },
      ],
      discount: 100,
      finalNotes: 'New final notes',
    });

    expect(budgetRepository.findById).toHaveBeenCalledWith('budget-1');
    expect(budgetRepository.update).toHaveBeenCalledTimes(1);

    const updatedEntity = budgetRepository.update.mock.calls[0][0] as BudgetEntity;
    expect(updatedEntity.id).toBe('budget-1');
    expect(updatedEntity.customerName).toBe('Roberto Silva');
    expect(updatedEntity.materials[0]?.name).toBe('Panel');

    expect(result).toMatchObject({
      id: 'budget-1',
      customerName: 'Roberto Silva',
      title: 'Updated budget',
    });
  });

  it('should throw when budget is not found', async () => {
    budgetRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute('missing-id', {
        customerName: 'Roberto Silva',
        customerPhone: '(11) 98888-7777',
        customerAddress: 'Rua B',
        customerNotes: 'New notes',
        title: 'Updated budget',
        description: 'Updated description',
        startDate: '2026-03-26',
        endDate: '2026-03-31',
        validityDate: '2026-04-10',
        billingType: BudgetBillingType.SERVICE,
        estimatedQuantity: 1,
        rateAmount: 2000,
        professionalsCount: 2,
        materials: [
          {
            name: 'Panel',
            unit: 'un',
            quantity: 1,
            unitPrice: 500,
          },
        ],
        discount: 100,
        finalNotes: 'New final notes',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(budgetRepository.update).not.toHaveBeenCalled();
  });
});
