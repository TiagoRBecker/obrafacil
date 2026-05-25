import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { CustomerEntity, CustomerWithOrders } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from './customer-repository.interface';

@Injectable()
export class CustomerRepo extends CustomerRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    const data = await this.prisma.customer.create({
      data: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        service: customer.service,
        city: customer.city,
      },
    });

    return CustomerEntity.create({
      address: data.address ?? '',
      name: data.name,
      phone: data.phone,
      service: data.service ?? '',
      city: data.city ?? '',
    });
  }

  async findAll(): Promise<CustomerWithOrders[]> {
    const customers = await this.prisma.customer.findMany({
      include: { orders: true },
    });

    return customers.map((c) => ({
      customer: CustomerEntity.toDTO({
        id: c.id,
        name: c.name ?? '',
        phone: c.phone ?? '',
        address: c.address ?? '',
        service: c.service ?? '',
        city: c.city ?? '',
      }),
      orders: c.orders ?? [],
    }));
  }

  async findById(id: string): Promise<CustomerEntity | null> {
    const customer = await this.prisma.customer.findUnique({ where: { id } });
    if (!customer) return null;

    return CustomerEntity.toDTO({
      id: customer.id,
      address: customer.address ?? '',
      name: customer.name ?? '',
      phone: customer.phone ?? '',
      service: customer.service ?? '',
      city: customer.city ?? '',
    });
  }

  async findByPhone(phone: string): Promise<CustomerEntity | null> {
    const customer = await this.prisma.customer.findUnique({ where: { phone } });
    if (!customer) return null;

    return CustomerEntity.toDTO({
      id: customer.id,
      address: customer.address ?? '',
      name: customer.name ?? '',
      phone: customer.phone ?? '',
      service: customer.service ?? '',
      city: customer.city ?? '',
    });
  }

  async update(id: string, customer: CustomerEntity): Promise<CustomerEntity> {
    const updated = await this.prisma.customer.update({
      where: { id },
      data: {
        address: customer.address,
        name: customer.name,
        phone: customer.phone,
        service: customer.service,
        city: customer.city,
      },
    });

    return CustomerEntity.toDTO({
      id: updated.id,
      address: updated.address ?? '',
      name: updated.name,
      phone: updated.phone,
      service: updated.service ?? '',
      city: updated.city ?? '',
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.customer.delete({ where: { id } });
  }
}
