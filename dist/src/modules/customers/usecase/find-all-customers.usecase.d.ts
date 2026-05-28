import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer-repository.interface';
export interface PaginatedCustomersResult {
    data: CustomerResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class FindAllCustomersUseCase {
    private readonly customerRepository;
    private readonly logger;
    constructor(customerRepository: CustomerRepositoryInterface);
    execute(page?: number, limit?: number): Promise<PaginatedCustomersResult>;
}
