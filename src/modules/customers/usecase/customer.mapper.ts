import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerEntity, CustomerEntityProps, CustomerWithOrders } from '../entity/customer.entity';

export class CustomerMapper {
  static toResponse(data: CustomerEntity): CustomerResponseDto {

    return {
      id: data.id as string,
      name: data.name,
      phone: data.phone,
      address: data.address as string,
      service: data.service,
      city: data.city as string,
      
    };
  }
  static toResponseWithOders(data: CustomerWithOrders): CustomerResponseDto {
    const { customer, orders } = data;
    return {
      id: customer.id as string,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      service: customer.service,
      city: customer.city as string,
      orders:orders || []
    };
  }
}


