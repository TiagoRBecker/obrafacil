import { IdParamDto } from '../../../common/dto/id-param.dto';
import { DeleteCustomerResponseDto } from '../dto/delete-customer-response.dto';
import { DeleteCustomerUseCase } from '../usecase/delete-customer.usecase';
export declare class DeleteCustomerController {
    private readonly deleteCustomerUseCase;
    constructor(deleteCustomerUseCase: DeleteCustomerUseCase);
    delete(params: IdParamDto): Promise<DeleteCustomerResponseDto>;
}
