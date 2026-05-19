import 'reflect-metadata';

import { NotFoundException } from '@nestjs/common';

import { BudgetBillingType } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepository } from '../repo/budget.repository.interface';
import { DeleteBudgetUseCase } from '../usecase/delete-budget.usecase';

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

describe('DeleteBudgetUseCase', () => {
  let budgetRepository: BudgetRepositoryMock;
  let useCase: DeleteBudgetUseCase;

  beforeEach(() => {
    budgetRepository = createRepositoryMock();
    useCase = new DeleteBudgetUseCase(budgetRepository);
  });

  it('should delete a budget successfully', async () => {
    budgetRepository.findById.mockResolvedValue(
      BudgetEntity.create({
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
      }),
    );
    budgetRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('budget-1');

    expect(budgetRepository.findById).toHaveBeenCalledWith('budget-1');
    expect(budgetRepository.delete).toHaveBeenCalledWith('budget-1');
    expect(result).toEqual({
      id: 'budget-1',
      deleted: true,
    });
  });

  it('should throw when budget is not found', async () => {
    budgetRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(budgetRepository.delete).not.toHaveBeenCalled();
  });
});
