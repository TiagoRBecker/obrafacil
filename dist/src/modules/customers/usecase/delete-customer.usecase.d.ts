import { DeleteCustomerResponseDto } from '../dto/delete-customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';
export declare class DeleteCustomerUseCase {
    private readonly customerRepository;
    private readonly logger;
    constructor(customerRepository: CustomerRepositoryInterface);
    execute(id: string): Promise<DeleteCustomerResponseDto>;
}
