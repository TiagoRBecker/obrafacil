import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerIdParamDto } from './dto/customer-id-param.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { DeleteCustomerResponseDto } from './dto/delete-customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService } from './customers.service';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(body: CreateCustomerDto): Promise<CustomerResponseDto>;
    update(params: CustomerIdParamDto, body: UpdateCustomerDto): Promise<CustomerResponseDto>;
    delete(params: CustomerIdParamDto): Promise<DeleteCustomerResponseDto>;
    findAll(): Promise<CustomerResponseDto[]>;
    findById(params: CustomerIdParamDto): Promise<CustomerResponseDto>;
}
