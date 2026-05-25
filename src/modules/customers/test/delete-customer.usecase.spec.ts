import { NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface as CustomerRepository } from '../repo/customer-repository.interface';
import { DeleteCustomerUseCase } from '../usecase/delete-customer.usecase';

type CustomerRepositoryMock = jest.Mocked<CustomerRepository>;

function createRepositoryMock(): CustomerRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
  };
}

describe('DeleteCustomerUseCase', () => {
  let customerRepository: CustomerRepositoryMock;
  let useCase: DeleteCustomerUseCase;

  beforeEach(() => {
    customerRepository = createRepositoryMock();
    useCase = new DeleteCustomerUseCase(customerRepository);
  });

  it('should delete a customer successfully', async () => {
    customerRepository.findById.mockResolvedValue(
      CustomerEntity.create({
        id: 'customer-1',
        name: 'Roberto Almeida',
        phone: '(11) 99999-9999',
        address: 'Rua A',
        createdAt: new Date('2026-03-01T10:00:00.000Z'),
        updatedAt: new Date('2026-03-01T10:00:00.000Z'),
      }),
    );
    customerRepository.delete.mockResolvedValue(undefined);

    const result = await useCase.execute('customer-1');

    expect(customerRepository.findById).toHaveBeenCalledWith('customer-1');
    expect(customerRepository.delete).toHaveBeenCalledWith('customer-1');
    expect(result).toEqual({
      id: 'customer-1',
      deleted: true,
    });
  });

  it('should throw when customer is not found', async () => {
    customerRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );

    expect(customerRepository.delete).not.toHaveBeenCalled();
  });
});
