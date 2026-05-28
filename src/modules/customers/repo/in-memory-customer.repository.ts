import { Injectable } from '@nestjs/common';

import { CustomerEntity, CustomerWithOrders } from '../entity/customer.entity';
import { CustomerRepositoryInterface, PaginatedCustomers } from './customer-repository.interface';

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
  async findByPhone(phone: string): Promise<CustomerEntity | null> {
    for (const customer of this.customers.values()) {
      if (customer.phone === phone) {
        return customer;
      }
    }
    return null;
  }

  async findAll(skip: number, take: number): Promise<PaginatedCustomers> {
    const values = [...this.customers.values()];
    return {
      data: values.slice(skip, skip + take) as any,
      total: values.length,
    };
  }

  async delete(id: string): Promise<void> {
    this.customers.delete(id);
  }
}
