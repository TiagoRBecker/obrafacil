import { IdParamDto } from '../../../common/dto/id-param.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { UpdateCustomerUseCase } from '../usecase/update-customer.usecase';
export declare class UpdateCustomerController {
    private readonly updateCustomerUseCase;
    constructor(updateCustomerUseCase: UpdateCustomerUseCase);
    update(params: IdParamDto, body: UpdateCustomerDto): Promise<CustomerResponseDto>;
}
