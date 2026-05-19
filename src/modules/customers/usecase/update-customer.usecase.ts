import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { CustomerResponseDto } from '../dto/customer-response.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class UpdateCustomerUseCase {
  private readonly logger = new Logger(UpdateCustomerUseCase.name);

  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(
    id: string,
    input: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    this.logger.log(`Iniciando atualização do cliente - ID: ${id}`);
    
    try {
      const currentCustomer = await this.customerRepository.findById(id);

      if (!currentCustomer?.id) {
        this.logger.error(`Cliente não encontrado - ID: ${id}`);
        throw new NotFoundException('Customer not found.');
      }

      this.logger.log(`Atualizando cliente - nome: ${input.name}`);
      const current = currentCustomer.toJSON();

      const updatedCustomer = CustomerEntity.create({
        ...current,
        name: input.name,
        phone: input.phone,
        address: input.address as string,
        city:input.city as string,
        service:input.service as string
      });

      const savedCustomer = await this.customerRepository.update(
        currentCustomer?.id,
        updatedCustomer,
      );
      this.logger.log(`Cliente atualizado com sucesso - ID: ${id}`);
      return CustomerMapper.toResponse(updatedCustomer);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      this.logger.error(`Erro ao atualizar cliente - ID: ${id}, erro: ${error.message || error}`);
      throw new BadRequestException(`Erro ao atualizar o usuario `);
    }
  }
}
