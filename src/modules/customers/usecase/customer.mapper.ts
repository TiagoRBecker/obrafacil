import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerEntity } from '../entity/customer.entity';

export class CustomerMapper {
  static toResponse(customer: CustomerEntity): CustomerResponseDto {
    return {
      id: customer.id as string,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      service: customer.service,
      city: customer.city as string,
    };
  }
}
