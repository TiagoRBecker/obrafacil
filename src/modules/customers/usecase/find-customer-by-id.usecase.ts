import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class FindCustomerByIdUseCase {
  private readonly logger = new Logger(FindCustomerByIdUseCase.name);

  constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(id: string): Promise<CustomerResponseDto> {
    this.logger.log(`Buscando cliente por ID: ${id}`);
    
    const customer = await this.customerRepository.findById(id);
    
    

    if (!customer?.id) {
      this.logger.error(`Cliente não encontrado - ID: ${id}`);
      throw new NotFoundException('Customer not found.');
    }

    this.logger.log(`Cliente encontrado - ID: ${id}, nome: ${customer.name}`);
    return CustomerMapper.toResponse(customer);
  }
}
