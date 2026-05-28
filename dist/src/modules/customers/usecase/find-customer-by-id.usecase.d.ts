import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer-repository.interface';
export declare class FindCustomerByIdUseCase {
    private readonly customerRepository;
    private readonly logger;
    constructor(customerRepository: CustomerRepositoryInterface);
    execute(id: string): Promise<CustomerResponseDto>;
}
