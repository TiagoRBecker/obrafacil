import { IdParamDto } from '../../../common/dto/id-param.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { FindCustomerByIdUseCase } from '../usecase/find-customer-by-id.usecase';
export declare class FindByIdCustomerController {
    private readonly findCustomerByIdUseCase;
    constructor(findCustomerByIdUseCase: FindCustomerByIdUseCase);
    findById(params: IdParamDto): Promise<CustomerResponseDto>;
}
