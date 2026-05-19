import { PrismaService } from '../../../db/prisma';
import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from './customer.repo.inteface';
export declare class CustomerRepo extends CustomerRepositoryInterface {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(customer: CustomerEntity): Promise<CustomerEntity>;
    findAll(): Promise<CustomerEntity[]>;
    findById(id: string): Promise<CustomerEntity | null>;
    findByphone(phone: string): Promise<CustomerEntity | null>;
    update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
    delete(id: string): Promise<void>;
}
