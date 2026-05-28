import { Injectable } from '@nestjs/common';

import { CustomerEntity, CustomerWithOrders } from '../../src/modules/customers/entity/customer.entity';
import { CustomerRepositoryInterface, PaginatedCustomers } from '../../src/modules/customers/repo/customer-repository.interface';

const DEFAULT_CUSTOMERS: CustomerWithOrders[] = [
  {
    customer: CustomerEntity.toDTO({
      id: 'customer-1',
      name: 'Roberto Almeida',
      phone: '(11) 99999-9999',
      address: 'Rua das Flores, 123 - Sao Paulo',
      service: 'Nome do servico',
      city: 'Cidade',
    }),
    orders: [],
  },
  {
    customer: CustomerEntity.toDTO({
      id: 'customer-2',
      name: 'Fernanda Lima',
      phone: '(11) 98888-7777',
      address: 'Av. Central, 456 - Campinas',
      service: 'Nome do servico',
      city: 'Cidade',
    }),
    orders: [],
  },
];

@Injectable()
export class MockCustomerRepository implements CustomerRepositoryInterface {
  private readonly customers: Map<string, CustomerWithOrders>;

  constructor() {
    this.customers = new Map(
      DEFAULT_CUSTOMERS.map((c) => [c.customer.id as string, c]),
    );
  }

  async create(entity: CustomerEntity): Promise<CustomerEntity> {
    const id = `customer-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const stored = CustomerEntity.toDTO({
      id,
      name: entity.name,
      phone: entity.phone,
      address: entity.address || '',
      service: entity.service,
      city: entity.city || '',
    });
    const entry: CustomerWithOrders = { customer: stored, orders: [] };
    this.customers.set(id, entry);
    return stored;
  }

  async update(id: string, entity: CustomerEntity): Promise<CustomerEntity> {
    const existing = this.customers.get(id);
    if (existing) {
      this.customers.set(id, { customer: entity, orders: existing.orders });
    }
    return entity;
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    return this.customers.get(id)?.customer ?? null;
  }

  async findByPhone(phone: string): Promise<CustomerEntity | null> {
    for (const entry of this.customers.values()) {
      if (entry.customer.phone === phone) {
        return entry.customer;
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
