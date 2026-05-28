import { PrismaService } from '../../../db/prisma';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface, PaginatedCustomers } from './customer-repository.interface';
export declare class CustomerRepo extends CustomerRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(customer: CustomerEntity): Promise<CustomerEntity>;
    findAll(skip: number, take: number): Promise<PaginatedCustomers>;
    findById(id: string): Promise<CustomerEntity | null>;
    findByPhone(phone: string): Promise<CustomerEntity | null>;
    update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
    delete(id: string): Promise<void>;
}
