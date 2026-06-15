import { ServiceTypeEnum } from '../src/modules/customers/dto/create-customer.dto';
import { CreateCustomerUseCase } from '../src/modules/customers/usecase/create-customer.usecase';
import { UpdateCustomerUseCase } from '../src/modules/customers/usecase/update-customer.usecase';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { FindAllCustomersUseCase } from '../src/modules/customers/usecase/find-all-customers.usecase';
import { InMemoryCustomerRepository } from '../src/modules/customers/repo/in-memory-customer.repository';
import { FindCustomerByIdUseCase } from '../src/modules/customers/usecase/find-customer-by-id.usecase';
import { DeleteCustomerUseCase } from '../src/modules/customers/usecase/delete-customer.usecase';
import { InMemoryBudgetRepository } from '../src/modules/budgets/repo/in-memory-budget.repository';
import { CreateBudgetUseCase } from '../src/modules/budgets/usecase/create-budget.usecase';
import { TypeCharge } from '../src/modules/budgets/dto/create-budget.dto';

describe('CustomersService (Testes Unitários)', () => {
  let create: CreateBudgetUseCase;
  let createCustomer: CreateCustomerUseCase;
  let repositoryCustomer: InMemoryCustomerRepository;
  let repository: InMemoryBudgetRepository;

  const id = '123'; // cliente inexistente erro  ao buscar notfound

  const customerDto = {
    name: 'Diego Shell',
    phone: '(51) 99999-8888',
    service: ServiceTypeEnum.ELECTRICAL,
    address: 'Rua de Teste, 10',
    city: 'Porto Alegre',
  };

  beforeEach(() => {
    // 1. Instanciamos o repositório falso em memória limpo para cada teste
    repositoryCustomer = new InMemoryCustomerRepository();
    repository = new InMemoryBudgetRepository();

    // 2. Injetamos o repositório direto no serviço (Injeção de Dependência manual)
    create = new CreateBudgetUseCase(repository, repositoryCustomer);
    createCustomer = new CreateCustomerUseCase(repositoryCustomer);
  });

  describe('Teste para criação de orders ', () => {
    it('Deve inciar criando um cliente e apos  iniciar a criação da ordem  de serviço', async () => {
      const customerId = await createCustomer.execute(customerDto);

      const dto = {
        name: 'João da Silva',
        phone: '(51) 99999-1234',
        address: 'Rua das Acácias, 150 - Centro',
        observations: 'Cliente solicitou atendimento pela manhã.',
        valueHour: 85,
        estimatedHours: 40,
        numberEmployees: 2,
        title: 'Instalação Elétrica Residencial',
        description:
          'Instalação de tomadas, iluminação e quadro de distribuição.',
        typeCharge: TypeCharge.HORA,
        materials: [
          {
            name: 'Cabo Flexível 2,5mm',
            unit: 'metro',
            quantity: 120,
            unitPrice: 3.5,
          },
          {
            name: 'Disjuntor 32A',
            unit: 'unidade',
            quantity: 2,
            unitPrice: 45,
          },
        ],
        initDate: '2026-06-10T00:00:00.000Z',
        endDate: '2026-06-20T00:00:00.000Z',
        validityDate: '2026-07-20T00:00:00.000Z',
        customerId: customerId.id,

        discount: 150,
        finalObservations: 'Garantia de 90 dias para mão de obra.',
        laborValue: 6800,
        materialValue: 510,
        totalValue: 7160,
      };

      const result = await create.execute(dto);
      expect(result).toMatchObject({
        id:result.id,
        name: dto.name,
        phone: dto.phone,
        address: dto.address,
        title: dto.title,
        description: dto.description,
        typeCharge: dto.typeCharge,
        customerId: dto.customerId,
      });
    });
  });
});
