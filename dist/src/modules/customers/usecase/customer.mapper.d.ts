import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerEntity, CustomerWithOrders } from '../entity/customer.entity';
export declare class CustomerMapper {
    static toResponse(data: CustomerEntity): CustomerResponseDto;
    static toResponseWithOders(data: CustomerWithOrders): CustomerResponseDto;
}
