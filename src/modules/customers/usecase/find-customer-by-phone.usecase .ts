import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class FindCustomerByPhoneUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(id: string): Promise<CustomerResponseDto> {
    const customer = await this.customerRepository.findByphone(id);

    if (!customer?.id) {
      throw new NotFoundException('Customer not found.');
    }

    return CustomerMapper.toResponse(customer);
  }
}
