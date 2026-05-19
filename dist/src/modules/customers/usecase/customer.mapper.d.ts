import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerEntity } from '../entity/customer.entity';
export declare class CustomerMapper {
    static toResponse(customer: CustomerEntity): CustomerResponseDto;
}
