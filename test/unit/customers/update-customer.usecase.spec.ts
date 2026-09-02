import { NotFoundException } from '@nestjs/common';
import { UpdateCustomerUseCase } from '../../../src/modules/customers/usecase/update-customer.usecase';
import { InMemoryCustomerRepository } from '../../../src/modules/customers/repo/in-memory-customer.repository';
import { CustomerEntity } from '../../../src/modules/customers/entity/customer.entity';
import { ServiceTypeEnum } from '../../../src/modules/customers/dto/create-customer.dto';

describe('UpdateCustomerUseCase', () => {
  let usecase: UpdateCustomerUseCase;
  let repository: InMemoryCustomerRepository;

  const customerId = 'customer-1';

  beforeEach(async () => {
    repository = new InMemoryCustomerRepository();
    await repository.create(
      CustomerEntity.toDTO({
        id: customerId,
        name: 'Carlos Almeida',
        phone: '(11) 98765-4321',
        address: 'Av. Paulista, 1000',
        service: ServiceTypeEnum.ELECTRICAL,
        city: 'São Paulo',
      }),
    );
    usecase = new UpdateCustomerUseCase(repository);
  });

  describe('execute', () => {
    it('have to update an existing customer', async () => {
      const result = await usecase.execute(customerId, {
        name: 'Carlos Almeida Filho',
        phone: '(11) 91234-5678',
        address: 'Rua Augusta, 500',
        service: ServiceTypeEnum.RENOVATION,
        city: 'São Paulo',
      });

      expect(result.id).toBe(customerId);
      expect(result.name).toBe('Carlos Almeida Filho');
      expect(result.phone).toBe('(11) 91234-5678');
      expect(result.address).toBe('Rua Augusta, 500');
      expect(result.service).toBe(ServiceTypeEnum.RENOVATION);
      expect(result.city).toBe('São Paulo');
    });

    it('have to throw NotFoundException when customer does not exist', async () => {
      await expect(
        usecase.execute('customer-inexistente', {
          name: 'Sem Cliente',
          phone: '(11) 90000-0000',
          service: ServiceTypeEnum.PAINTING,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
