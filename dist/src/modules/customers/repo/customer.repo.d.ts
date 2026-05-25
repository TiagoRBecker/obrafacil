import { PrismaService } from '../../../db/prisma';
import { CustomerEntity, CustomerWithOrders } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from './customer-repository.interface';
export declare class CustomerRepo extends CustomerRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(customer: CustomerEntity): Promise<CustomerEntity>;
    findAll(): Promise<CustomerWithOrders[]>;
    findById(id: string): Promise<CustomerEntity | null>;
    findByPhone(phone: string): Promise<CustomerEntity | null>;
    update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
    delete(id: string): Promise<void>;
}
