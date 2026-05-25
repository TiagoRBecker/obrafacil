import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { DeleteCustomerResponseDto } from '../dto/delete-customer-response.dto';
import { DeleteCustomerUseCase } from '../usecase/delete-customer.usecase';
export declare class DeleteCustomerController {
    private readonly deleteCustomerUseCase;
    constructor(deleteCustomerUseCase: DeleteCustomerUseCase);
    delete(params: CustomerIdParamDto): Promise<DeleteCustomerResponseDto>;
}
