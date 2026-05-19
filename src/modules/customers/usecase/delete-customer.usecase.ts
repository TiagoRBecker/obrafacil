import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { DeleteCustomerResponseDto } from '../dto/delete-customer-response.dto';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';

@Injectable()
export class DeleteCustomerUseCase {
  private readonly logger = new Logger(DeleteCustomerUseCase.name);

  constructor(private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute(id: string): Promise<DeleteCustomerResponseDto> {
    this.logger.log(`Iniciando exclusão do cliente - ID: ${id}`);
    
    const existingCustomer = await this.customerRepository.findById(id);

    if (!existingCustomer?.id) {
      this.logger.error(`Cliente não encontrado para exclusão - ID: ${id}`);
      throw new NotFoundException('Customer not found.');
    }

    await this.customerRepository.delete(id);
    this.logger.log(`Cliente excluído com sucesso - ID: ${id}`);

    return {
      id,
      deleted: true,
    };
  }
}
