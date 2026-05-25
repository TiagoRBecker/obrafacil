import { NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface as CustomerRepository } from '../repo/customer-repository.interface';
import { UpdateCustomerUseCase } from '../usecase/update-customer.usecase';

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

describe('UpdateCustomerUseCase', () => {
  let customerRepository: CustomerRepositoryMock;
  let useCase: UpdateCustomerUseCase;

  beforeEach(() => {
    customerRepository = createRepositoryMock();
    useCase = new UpdateCustomerUseCase(customerRepository);
  });

  it('should update a customer successfully', async () => {
    const existingCustomer = CustomerEntity.create({
      id: 'customer-1',
      name: 'Roberto Almeida',
      phone: '(11) 99999-9999',
      address: 'Rua A',
      createdAt: new Date('2026-03-01T10:00:00.000Z'),
      updatedAt: new Date('2026-03-01T10:00:00.000Z'),
    });

    customerRepository.findById.mockResolvedValue(existingCustomer);
    customerRepository.update.mockImplementation(async (customer) => customer);

    const result = await useCase.execute('customer-1', {
      name: 'Roberto Silva',
      phone: '(11) 98888-7777',
      address: 'Rua B',
    });

    expect(customerRepository.findById).toHaveBeenCalledWith('customer-1');
    expect(customerRepository.update).toHaveBeenCalledTimes(1);

    const updatedEntity = customerRepository.update.mock.calls[0][0] as CustomerEntity;
    expect(updatedEntity.id).toBe('customer-1');
    expect(updatedEntity.name).toBe('Roberto Silva');
    expect(updatedEntity.phone).toBe('(11) 98888-7777');
    expect(updatedEntity.address).toBe('Rua B');

    expect(result).toMatchObject({
      id: 'customer-1',
      name: 'Roberto Silva',
      phone: '(11) 98888-7777',
      address: 'Rua B',
    });
  });

  it('should throw when customer is not found', async () => {
    customerRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute('missing-id', {
        name: 'Roberto Silva',
        phone: '(11) 98888-7777',
        address: 'Rua B',
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(customerRepository.update).not.toHaveBeenCalled();
  });
});
