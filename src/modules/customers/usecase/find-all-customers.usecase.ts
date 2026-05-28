import { Injectable, Logger } from '@nestjs/common';

import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer-repository.interface';
import { CustomerMapper } from './customer.mapper';

export interface PaginatedCustomersResult {
  data: CustomerResponseDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

@Injectable()
export class FindAllCustomersUseCase {
  private readonly logger = new Logger(FindAllCustomersUseCase.name);

  constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(page: number = 1, limit: number = 10): Promise<PaginatedCustomersResult> {
    this.logger.log(`Buscando clientes - página: ${page}, limite: ${limit}`);
    const skip = (page - 1) * limit;
    const { data, total } = await this.customerRepository.findAll(skip, limit);
    this.logger.log(`Encontrados ${total} clientes no total, retornando ${data.length}`);
    
    return {
      data: data.map(CustomerMapper.toResponseWithOrders),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
