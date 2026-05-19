import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';
export declare class CreateCustomerUseCase {
    private readonly customerRepository;
    private readonly logger;
    constructor(customerRepository: CustomerRepositoryInterface);
    execute(input: CreateCustomerDto): Promise<CustomerResponseDto>;
}
