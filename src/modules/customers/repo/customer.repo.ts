import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { CustomerEntity, CustomerEntityProps, CustomerWithOrders } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from './customer.repo.inteface';

@Injectable()
export class CustomerRepo extends CustomerRepositoryInterface {
  private readonly logger = new Logger(CustomerRepo.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    const { address, id, name, phone, service,city } = customer;
    try {
      const data = await this.prisma.customer.create({
        data: {
          name,
          phone,
          address,
          service,
          city
        },
      });
      this.logger.log('Cliente criado com sucesso ');
      return CustomerEntity.create({
        address: data.address as string,
        name: data.name,
        phone: data.phone,
        service: data.service as string,
        city: data.city as string,
      });
    } catch (error) {
      this.logger.error('Erro ao criar o cliente', {
        error,
        operation: 'CREATE',
        entity: 'CustomerEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível criar  o cliente. Tente novamente.`,
      );
    }
  }

  async findAll(): Promise<CustomerWithOrders[]> {
    try {
      const customer = await this.prisma.customer.findMany({
        include:{
          orders:true
        }
      });

     return customer.map((c) => {
      return {
        // Reconstrói a entidade perfeitamente sem o campo orders nela
        customer: CustomerEntity.toDTO({
          id: c.id,
          name: c.name ?? '',
          phone: c.phone ?? '',
          address: c.address ?? '',
          service: c.service ?? '',
          city: c.city ?? '',
        }),
        orders: c.orders ?? [] 
      };
    });
    } catch (error) {
      this.logger.error('Erro ao bucar os clientes', {
        error,
        operation: 'FIND ALL',
        entity: 'CustomerEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível buscar os clientes. Tente novamente.`,
      );
    }
  }
  async findById(id: string): Promise<CustomerEntity | null> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: {
          id: id,
        },
      });
   

      return CustomerEntity.toDTO({
        id: customer?.id as string,
        address: customer?.address ?? '',
        name: customer?.name ?? '',
        phone: customer?.phone ?? '',
        service: customer?.service ?? '',
        city: customer?.city ?? '',
      });
    } catch (error) {
      this.logger.error('Erro ao bucar o cliente por ID', {
        error,
        operation: 'FIND BY ID',
        entity: 'CustomerEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível buscar o cliente. Tente novamente.`,
      );
    }
  }
  async findByphone(phone: string): Promise<CustomerEntity | null> {
    try {
      const customer = await this.prisma.customer.findUnique({
        where: {
          phone,
        },
      });

      return CustomerEntity.toDTO({
        id: customer?.id as string,
        address: customer?.address ?? '',
        name: customer?.name ?? '',
        phone: customer?.phone ?? '',
        service: customer?.service ?? '',
        city: customer?.city ?? '',
      });
    } catch (error) {
      this.logger.error('Erro ao bucar o cliente', {
        error,
        operation: 'FIND BY PHONE',
        entity: 'CustomerEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível buscar o cliente. Tente novamente.`,
      );
    }
  }
  async update(id: string, customer: CustomerEntity): Promise<CustomerEntity> {
    const { address, name, phone, service,city } = customer;
    try {
      const update = await this.prisma.customer.update({
        where: {
          id,
        },
        data: {
          address,
          name,
          phone,
          service,
          city,
        },
      });
  
      return CustomerEntity.toDTO({
        address:update.address,
        city:update.city,
        name:update.name,
        phone:update.phone,
        service:update.service,
        id:update.id
      } as CustomerEntityProps);
    } catch (error) {
      this.logger.error('Erro ao  atualizar  o cliente no banco', {
        error,
        operation: 'UPDATE',
        entity: 'CustomerEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível atualizar o cliente. Tente novamente.`,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await this.prisma.customer.delete({
        where: {
          id,
        },
      });
      return;
    } catch (error) {
      this.logger.error('Erro ao excluir  cliente  no banco', {
        error,
        operation: 'DELETE',
        entity: 'CustomerEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível excluir o cliente. Tente novamente.`,
      );
    }
  }
}
