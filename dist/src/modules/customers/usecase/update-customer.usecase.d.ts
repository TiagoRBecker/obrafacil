import { CustomerResponseDto } from '../dto/customer-response.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerRepositoryInterface } from '../repo/customer-repository.interface';
export declare class UpdateCustomerUseCase {
    private readonly customerRepository;
    private readonly logger;
    constructor(customerRepository: CustomerRepositoryInterface);
    execute(id: string, input: UpdateCustomerDto): Promise<CustomerResponseDto>;
}
