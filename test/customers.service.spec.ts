import { ServiceTypeEnum } from '../src/modules/customers/dto/create-customer.dto';
import { CreateCustomerUseCase } from '../src/modules/customers/usecase/create-customer.usecase';
import { UpdateCustomerUseCase } from '../src/modules/customers/usecase/update-customer.usecase';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAllCustomersUseCase } from '../src/modules/customers/usecase/find-all-customers.usecase';
import { InMemoryCustomerRepository } from '../src/modules/customers/repo/in-memory-customer.repository';
import { FindCustomerByIdUseCase } from '../src/modules/customers/usecase/find-customer-by-id.usecase';
import { DeleteCustomerUseCase } from '../src/modules/customers/usecase/delete-customer.usecase';
import { customerMockDto } from './helpers/mocks/customer';

describe('CustomersService (Testes Unitários)', () => {
  let create: CreateCustomerUseCase;
  let update: UpdateCustomerUseCase;
  let repository: InMemoryCustomerRepository;
  let findAll: FindAllCustomersUseCase;
  let findById: FindCustomerByIdUseCase;
  let deleteById: DeleteCustomerUseCase;
const id = "123" // cliente inexistente erro  ao buscar notfound
 

  beforeEach(() => {
    // 1. Instanciamos o repositório falso em memória limpo para cada teste
    repository = new InMemoryCustomerRepository();

    // 2. Injetamos o repositório direto no serviço (Injeção de Dependência manual)
    create = new CreateCustomerUseCase(repository);
    update = new UpdateCustomerUseCase(repository);
    findAll = new FindAllCustomersUseCase(repository);
    findById = new FindCustomerByIdUseCase(repository);
    deleteById = new DeleteCustomerUseCase(repository);
  });

  describe('Testes de criaçao de cliente ', () => {
    it('deve criar um cliente com sucesso', async () => {
      const result = await create.execute(customerMockDto);

      const id = result.id;
      expect(result).toHaveProperty('id');
      expect(result.id).toEqual(id);
      expect(result.name).toBe('Diego Shell');
    });
    it('deve lançar um erro ao tentar criar um cliente com o nome nulo', async () => {
      const dtoInputInvalido = {
        name: null,
        phone: '(51) 99999-8888',
        service: ServiceTypeEnum.ELECTRICAL,
        address: 'Rua de Teste, 10',
        city: 'Porto Alegre',
      };

      await expect(
        create.execute(dtoInputInvalido as any),
      ).rejects.toBeInstanceOf(BadRequestException);
    });
  });

  describe('Testes de atualizaçao de clientes', () => {
    it('deve atualizar um cliente com sucesso', async () => {
      const newDto = {
        name: 'Diego Shell Atualizado',
        phone: '(51) 99999-8888',
        service: ServiceTypeEnum.ELECTRICAL,
        address: 'Rua de Teste, 10',
        city: 'Novo Hamburgo',
      };
      const result = await create.execute(customerMockDto);
      const updateCustomer = await update.execute(result.id, newDto);

      expect(updateCustomer).toHaveProperty('id');
      expect(result.id).toEqual(updateCustomer.id);
      expect(updateCustomer.name).toBe('Diego Shell Atualizado');
      expect(updateCustomer.city).toBe('Novo Hamburgo');
    });
    it('nao deve atualizar um cliente Error notfound', async () => {
      const newDto = {
        name: 'Diego Shell Atualizado',
        phone: '(51) 99999-8888',
        service: ServiceTypeEnum.ELECTRICAL,
        address: 'Rua de Teste, 10',
        city: 'Novo Hamburgo',
      };

      await expect(update.execute(id, newDto)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });

  describe('Testes de buscas de clientes', () => {
    it('Deve buscar os cliente com sucesso', async () => {
      for (let i = 1; i <= 5; i++) {
        const dto = {
          name: `Diego Shell `,
          phone: `(51) 99999-888${i}`,
          service: ServiceTypeEnum.ELECTRICAL,
          address: 'Rua de Teste, 10',
          city: 'Porto Alegre',
        };
        await create.execute(dto);
      }

      const findAllCustomers = await findAll.execute();
      expect(findAllCustomers.data).toHaveLength(5);
    });
    it('Deve   buscar um  cliente com sucesso', async () => {
      const result = await create.execute(customerMockDto);
      const customer = await findById.execute(result.id);

      expect(customer).toHaveProperty('id');
      expect(customer.id).toEqual(result.id);
      expect(customer.name).toBe('Diego Shell');
    });
    it('Deve falhar ao  buscar um  cliente notfound', async () => {
      await create.execute(customerMockDto);
     
      await expect(findById.execute(id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
  describe('Testes de excluir', () => {
    it('Deve detelar o cliente com sucesso', async () => {
      const data = await create.execute(customerMockDto);
      await deleteById.execute(data.id);

      await expect(findById.execute(data.id)).rejects.toBeInstanceOf(
        NotFoundException,
      );
    });
  });
});
