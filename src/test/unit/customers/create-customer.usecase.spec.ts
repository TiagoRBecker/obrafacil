
import { InMemoryCustomerRepository } from "../../../modules/customers/repo/in-memory-customer.repository";
import { CreateCustomerUseCase } from "../../../modules/customers/usecase/create-customer.usecase";
import { ServiceTypeEnum } from "../../../modules/customers/dto/create-customer.dto";
import { ConflictException } from "@nestjs/common";


describe('CreateCustomerUseCase', () => {
  let usecase: CreateCustomerUseCase;
  let repository: InMemoryCustomerRepository;

  beforeEach(() => {
    repository = new InMemoryCustomerRepository();
    usecase = new CreateCustomerUseCase(repository);
  });

  describe('execute', () => {
  it('have to create a customer when phone is not in use', async () => {
      const result = await usecase.execute({
        name: 'Carlos Almeida',
        phone: '(11) 98765-4321',
        service: ServiceTypeEnum.ELECTRICAL,
        address: 'Av. Paulista, 1000',
        city: 'São Paulo',
      });

      expect(result.name).toBe('Carlos Almeida');
      expect(result.phone).toBe('(11) 98765-4321');
      expect(result.service).toBe(ServiceTypeEnum.ELECTRICAL);
      expect(result.address).toBe('Av. Paulista, 1000');
      expect(result.city).toBe('São Paulo');
      expect(result.id).toBeDefined();
    });

    it('have to create customer without optional address and city', async () => {
      const result = await usecase.execute({
        name: 'Maria Souza',
        phone: '(21) 99999-1111',
        service: ServiceTypeEnum.PAINTING,
      });

      expect(result.name).toBe('Maria Souza');
      expect(result.id).toBeDefined();
    });

    it('have to throw ConflictException when phone already registered', async () => {
      await usecase.execute({
        name: 'Primeiro',
        phone: '(11) 98765-4321',
        service: ServiceTypeEnum.ELECTRICAL,
      });

      await expect(
        usecase.execute({
          name: 'Segundo',
          phone: '(11) 98765-4321',
          service: ServiceTypeEnum.MASONRY,
        }),
      ).rejects.toThrow(ConflictException);
    });
  });
});
