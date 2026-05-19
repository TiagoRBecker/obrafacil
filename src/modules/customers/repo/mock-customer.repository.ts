import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from './customer.repo.inteface';

@Injectable()
export class MockCustomerRepository implements CustomerRepositoryInterface {
  private readonly customers = new Map<string, CustomerEntity>([
    [
      'customer-1',
      CustomerEntity.create({
        name: 'Roberto Almeida',
        phone: '(11) 99999-9999',
        address: 'Rua das Flores, 123 - Sao Paulo',
        service: 'Nome do servico',
        city: 'Cidade',
      }),
    ],
    [
      'customer-2',
      CustomerEntity.create({
        name: 'Fernanda Lima',
        phone: '(11) 98888-7777',
        address: 'Av. Central, 456 - Campinas',
        service: 'Nome do servico',
        city: 'Cidade',
      }),
    ],
  ]);

  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    this.customers.set(customer.id as string, customer);
    return customer;
  }

  async update(id:string, customer: CustomerEntity): Promise<CustomerEntity> {
    this.customers.set(customer.id as string, customer);
    return customer;
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    return this.customers.get(id) ?? null;
  }
   async findByphone(id: string): Promise<CustomerEntity | null> {
    return this.customers.get(id) ?? null;
  }

  async findAll(): Promise<CustomerEntity[]> {
    return [...this.customers.values()];
  }

  async delete(id: string): Promise<void> {
    this.customers.delete(id);
  }
}
