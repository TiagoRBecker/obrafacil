import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer-repository.interface';
export declare class FindCustomerByPhoneUseCase {
    private readonly customerRepository;
    constructor(customerRepository: CustomerRepositoryInterface);
    execute(phone: string): Promise<CustomerResponseDto>;
}
