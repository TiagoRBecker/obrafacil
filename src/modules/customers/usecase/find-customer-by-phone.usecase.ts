import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer-repository.interface';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class FindCustomerByPhoneUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(phone: string): Promise<CustomerResponseDto> {
    const customer = await this.customerRepository.findByPhone(phone);

    if (!customer?.id) {
      throw new NotFoundException('Customer not found.');
    }

    return CustomerMapper.toResponse(customer);
  }
}
