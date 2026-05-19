import { randomUUID } from 'node:crypto';

import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from '../repo/customer.repo.inteface';
import { CustomerMapper } from './customer.mapper';

@Injectable()
export class CreateCustomerUseCase {
  private readonly logger = new Logger(CreateCustomerUseCase.name);

  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(input: CreateCustomerDto): Promise<CustomerResponseDto> {
    this.logger.log(`Iniciando criação de cliente - telefone: ${input.phone}`);
    
    const existCustomer = await this.customerRepository.findByphone(input.phone);

    if (existCustomer?.phone) {
      this.logger.warn(`Conflito: telefone já cadastrado - ${input.phone}`);
      throw new ConflictException(
        'Já existe um usuario com o numero de telefone cadastrado',
      );
    }
    
    try {
      this.logger.log(`Criando cliente - nome: ${input.name}`);
      const customer = CustomerEntity.create({
        name: input.name,
        phone: input.phone,
        service: input.service,
        address: input.address as string,
        city: input.city as string,
      });
      
      const createdCustomer = await this.customerRepository.create(customer);
      this.logger.log(`Cliente criado com sucesso - ID: ${createdCustomer.id}, nome: ${createdCustomer.name}`);
      return CustomerMapper.toResponse(createdCustomer);
    } catch (error:any) {
      this.logger.error(`Erro ao criar cliente - telefone: ${input.phone}, erro: ${error.message || error}`);
      throw new BadRequestException(
        'Erro ao criar o usuario. Consulte a area logs para maiores informaçoes ',
      );
    }
  }
}
