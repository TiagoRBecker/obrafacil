import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from './customer.repo.inteface';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepositoryInterface {
  private readonly customers = new Map<string, CustomerEntity>();

  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    this.customers.set(customer.id as string, customer);
    return customer;
  }

  async update(id:string,customer: CustomerEntity): Promise<CustomerEntity> {
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
