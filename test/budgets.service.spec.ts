
import { CreateCustomerUseCase } from '../src/modules/customers/usecase/create-customer.usecase';
import {  NotFoundException } from '@nestjs/common';
import { InMemoryCustomerRepository } from '../src/modules/customers/repo/in-memory-customer.repository';
import { InMemoryBudgetRepository } from '../src/modules/budgets/repo/in-memory-budget.repository';
import { CreateBudgetUseCase } from '../src/modules/budgets/usecase/create-budget.usecase';
import { orderDto } from './helpers/mocks/budgets';
import { UpdateBudgetUseCase } from '../src/modules/budgets/usecase/update-budget.usecase';
import { customerMockDto } from './helpers/mocks/customer';
import { FindAllBudgetsUseCase } from '../src/modules/budgets/usecase/find-all-budgets.usecase';
import { FindBudgetByIdUseCase } from '../src/modules/budgets/usecase/find-budget-by-id.usecase';
import { DeleteBudgetUseCase } from '../src/modules/budgets/usecase/delete-budget.usecase';

describe('Budgets  (Testes Unitários)', () => {
  let create: CreateBudgetUseCase;
  let update: UpdateBudgetUseCase;
  let delelteOrder: DeleteBudgetUseCase;
  let findAllOrders: FindAllBudgetsUseCase;
  let findByIdOrders: FindBudgetByIdUseCase;
  let createCustomer: CreateCustomerUseCase;
  let repositoryCustomer: InMemoryCustomerRepository;
  let repository: InMemoryBudgetRepository;

  const id = '123'; // cliente inexistente erro  ao buscar notfound

  beforeEach(() => {
    // 1. Instanciamos o repositório falso em memória limpo para cada teste
    repositoryCustomer = new InMemoryCustomerRepository();
    repository = new InMemoryBudgetRepository();

    // 2. Injetamos o repositório direto no serviço (Injeção de Dependência manual)
    create = new CreateBudgetUseCase(repository, repositoryCustomer);
    createCustomer = new CreateCustomerUseCase(repositoryCustomer);
    update = new UpdateBudgetUseCase(repository, repositoryCustomer);
    findAllOrders = new FindAllBudgetsUseCase(repository);
    findByIdOrders = new FindBudgetByIdUseCase(repository);
    delelteOrder = new DeleteBudgetUseCase(repository);
  });

  describe('Teste para criação de orders ', () => {
    it('Deve inciar criando um cliente e apos  iniciar a criação da ordem  de serviço', async () => {
      const customerId = await createCustomer.execute(customerMockDto);

      const dto = orderDto(customerId.id);
      const result = await create.execute(dto);
      expect(result).toMatchObject({
        id: result.id,
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
        title: dto.title,
        description: dto.description,
        typeCharge: dto.typeCharge,
        customerId: dto.customerId,
      });
    });
    it('Deve falhar a criaçao da ordem devido a ausencia de um customerId', async () => {
      const dto = orderDto(id);

      await expect(create.execute(dto)).rejects.toThrow(
        'Usuario nao encontrado',
      );
    });
  });
  describe('Teste para atualizaçao  de orders ', () => {
    it('Deve inciar criando um cliente ,  iniciar a criação da ordem  de serviço , iniciar a atualizaçao da ordem de serviço', async () => {
      const customerId = await createCustomer.execute(customerMockDto);

      const dto = orderDto(customerId.id);
      const result = await create.execute(dto);
      const updatenewOrder = await update.execute(result.id, {
        ...dto,
        name: 'Tiago',
        address: 'Novo endreço ',
      });
      expect(updatenewOrder).toMatchObject({
        id: result.id,
        name: updatenewOrder.name,
        phone: dto.phone,
        address: updatenewOrder.address,
      });
    });
    it('Deve falhar a atualizaçao  da ordem devido a ausencia de uma ordem Id valida no banco', async () => {
      const customerId = await createCustomer.execute(customerMockDto);
      const dto = orderDto(customerId.id);

      await expect(update.execute(id, dto)).rejects.toThrow(
        'Budget not found.',
      );
    });
  });
  describe('Teste para busca   de orders ', () => {
    it('Deve inciar criando um clientes ,  iniciar a criação da ordem  de serviço , iniciar a busca  de 5 ordem de serviço ', async () => {
      for (let i = 1; i <= 5; i++) {
        const customerId = await createCustomer.execute({
          ...customerMockDto,
          phone: `${customerMockDto.phone}${i}`,
        });

        const dto = orderDto(customerId.id);
        await create.execute(dto);
      }
      const allOrders = await findAllOrders.execute();

      expect(allOrders.data).toHaveLength(5);
    });
    it('Deve buscar pelo ID uma ordem de serviço ', async () => {
      const customerId = await createCustomer.execute(customerMockDto);
      const dto = orderDto(customerId.id);
      const createOrder = await create.execute(dto);
      const findById = await findByIdOrders.execute(createOrder.id);
      expect(findById).toMatchObject({
        id: createOrder.id,
        name: createOrder.name,
        phone: createOrder.phone,
        address: createOrder.address,
        title: createOrder.title,
        description: createOrder.description,
        typeCharge: createOrder.typeCharge,
        customerId: createOrder.customerId,
      });
    });
    it('Deve retorrnar  um erro por nao encontrar  pelo ID uma ordem de serviço ', async () => {
      const customerId = await createCustomer.execute(customerMockDto);
      const dto = orderDto(customerId.id);
      await create.execute(dto);

      await expect(findByIdOrders.execute(id)).rejects.toThrow(
        'Budget not found.',
      );
    });
  });
  describe('Teste para excluir  order ', () => {
    it('Deve  criar o  cliente , criar a ordem , excluir a ordem , e verificar se foi excluida   ', async () => {
      const customerId = await createCustomer.execute(customerMockDto);
      const dto = orderDto(customerId.id);
      const createOrder = await create.execute(dto);
      await delelteOrder.execute(createOrder.id);

      await expect(
        findByIdOrders.execute(createOrder.id),
      ).rejects.toBeInstanceOf(NotFoundException);
    });
  });
});
