import 'reflect-metadata';

import { BudgetBillingType } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepository } from '../repo/budget.repository.interface';
import { CreateBudgetUseCase } from '../usecase/create-budget.usecase';

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

describe('CreateBudgetUseCase', () => {
  let budgetRepository: BudgetRepositoryMock;
  let useCase: CreateBudgetUseCase;

  beforeEach(() => {
    budgetRepository = createRepositoryMock();
    useCase = new CreateBudgetUseCase(budgetRepository);
  });

  it('should create a budget successfully', async () => {
    budgetRepository.create.mockImplementation(async (budget) => budget);

    const result = await useCase.execute({
      customerName: ' Roberto Almeida ',
      customerPhone: ' (11) 99999-9999 ',
      customerAddress: ' Rua das Flores, 123 ',
      customerNotes: ' Morning visits only ',
      title: ' Residential Electrical Installation ',
      description: ' Full electrical service ',
      startDate: '2026-03-25',
      endDate: '2026-03-30',
      validityDate: '2026-04-05',
      billingType: BudgetBillingType.HOUR,
      estimatedQuantity: 16,
      rateAmount: 120,
      professionalsCount: 2,
      materials: [
        {
          name: ' Circuit breaker ',
          unit: ' un ',
          quantity: 4,
          unitPrice: 35,
        },
      ],
      discount: 50,
      finalNotes: ' Payment in two installments ',
    });

    expect(budgetRepository.create).toHaveBeenCalledTimes(1);

    const createdEntity = budgetRepository.create.mock.calls[0][0] as BudgetEntity;
    expect(createdEntity.customerName).toBe('Roberto Almeida');
    expect(createdEntity.materials[0]?.name).toBe('Circuit breaker');
    expect(createdEntity.materials[0]?.unit).toBe('un');

    expect(result.customerName).toBe('Roberto Almeida');
    expect(result.title).toBe('Residential Electrical Installation');
    expect(result.materials).toHaveLength(1);
    expect(result.materials[0]?.name).toBe('Circuit breaker');
    expect(result.id).toBeTruthy();
  });
});
