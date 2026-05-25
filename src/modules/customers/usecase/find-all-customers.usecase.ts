import { Injectable, Logger } from '@nestjs/common';

import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer-repository.interface';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class FindAllCustomersUseCase {
  private readonly logger = new Logger(FindAllCustomersUseCase.name);

  constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(): Promise<CustomerResponseDto[]> {
    this.logger.log('Buscando todos os clientes');
    const customers = await this.customerRepository.findAll();
    this.logger.log(`Encontrados ${customers.length} clientes`);
    const data  = customers.map(CustomerMapper.toResponseWithOrders);
    
    
    return data
  }
}
