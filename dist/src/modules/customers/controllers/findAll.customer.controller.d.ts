import { CustomerResponseDto } from '../dto/customer-response.dto';
import { FindAllCustomersUseCase } from '../usecase/find-all-customers.usecase';
export declare class FindAllCustomersController {
    private readonly findAllCustomersUseCase;
    constructor(findAllCustomersUseCase: FindAllCustomersUseCase);
    findAll(): Promise<CustomerResponseDto[]>;
}
