import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';
export declare class FindCustomerByPhoneUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepositoryInterface);
    execute(id: string): Promise<CustomerResponseDto>;
}
