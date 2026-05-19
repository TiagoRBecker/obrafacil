import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepository } from '../repo/customer.repo.inteface';
import { CreateCustomerUseCase } from '../usecase/create-customer.usecase';

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

describe('CreateCustomerUseCase', () => {
  let customerRepository: CustomerRepositoryMock;
  let useCase: CreateCustomerUseCase;

  beforeEach(() => {
    customerRepository = createRepositoryMock();
    useCase = new CreateCustomerUseCase(customerRepository);
  });

  it('should create a customer successfully', async () => {
    customerRepository.create.mockImplementation(async (customer) => customer);

    const result = await useCase.execute({
      name: ' Roberto Almeida ',
      phone: ' (11) 99999-9999 ',
      address: ' Rua das Flores, 123 ',
    });

    expect(customerRepository.create).toHaveBeenCalledTimes(1);

    const createdEntity = customerRepository.create.mock.calls[0][0] as CustomerEntity;
    expect(createdEntity.name).toBe('Roberto Almeida');
    expect(createdEntity.phone).toBe('(11) 99999-9999');
    expect(createdEntity.address).toBe('Rua das Flores, 123');

    expect(result.name).toBe('Roberto Almeida');
    expect(result.phone).toBe('(11) 99999-9999');
    expect(result.address).toBe('Rua das Flores, 123');
    expect(result.id).toBeTruthy();
  });
});
