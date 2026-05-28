import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CreateCustomerUseCase } from '../usecase/create-customer.usecase';
export declare class CreateCustomerController {
    private readonly createCustomerUseCase;
    constructor(createCustomerUseCase: CreateCustomerUseCase);
    create(body: CreateCustomerDto): Promise<CustomerResponseDto>;
}
