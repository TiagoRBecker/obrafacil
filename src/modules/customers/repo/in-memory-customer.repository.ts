import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';

import {
  CustomerEntity,
  CustomerEntityProps,
  CustomerWithOrders,
} from '../entity/customer.entity';
import {
  CustomerRepositoryInterface,
  PaginatedCustomers,
} from './customer-repository.interface';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepositoryInterface {
  private readonly customers = new Map<string, CustomerEntity>();

  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    const id = customer.id || randomUUID();
    const entity = CustomerEntity.toDTO({ ...customer.toJSON(), id });
    this.customers.set(id, entity);

    return entity;
  }

  async update(id: string, customer: CustomerEntity): Promise<CustomerEntity> {
    const entity = CustomerEntity.toDTO({ ...customer.toJSON(), id });
    this.customers.set(id, entity);
    return entity;
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
      data: values.map((customer) => ({ customer, orders: [] })) as any,
      total: values.length,
    };
  }

  async delete(id: string): Promise<void> {
    this.customers.delete(id);
  }
}
