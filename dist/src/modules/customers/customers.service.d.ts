import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { DeleteCustomerResponseDto } from './dto/delete-customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerUseCase } from './usecase/create-customer.usecase';
import { DeleteCustomerUseCase } from './usecase/delete-customer.usecase';
import { FindAllCustomersUseCase } from './usecase/find-all-customers.usecase';
import { FindCustomerByIdUseCase } from './usecase/find-customer-by-id.usecase';
import { UpdateCustomerUseCase } from './usecase/update-customer.usecase';
export declare class CustomersService {
    private readonly createCustomerUseCase;
    private readonly updateCustomerUseCase;
    private readonly findCustomerByIdUseCase;
    private readonly findAllCustomersUseCase;
    private readonly deleteCustomerUseCase;
    constructor(createCustomerUseCase: CreateCustomerUseCase, updateCustomerUseCase: UpdateCustomerUseCase, findCustomerByIdUseCase: FindCustomerByIdUseCase, findAllCustomersUseCase: FindAllCustomersUseCase, deleteCustomerUseCase: DeleteCustomerUseCase);
    create(input: CreateCustomerDto): Promise<CustomerResponseDto>;
    update(id: string, input: UpdateCustomerDto): Promise<CustomerResponseDto>;
    findById(id: string): Promise<CustomerResponseDto>;
    findAll(): Promise<CustomerResponseDto[]>;
    delete(id: string): Promise<DeleteCustomerResponseDto>;
}
