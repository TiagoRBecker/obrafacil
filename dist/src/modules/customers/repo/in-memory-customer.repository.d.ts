import { CustomerEntity } from '../entity/customer.entity';
import { CustomerRepositoryInterface, PaginatedCustomers } from './customer-repository.interface';
export declare class InMemoryCustomerRepository implements CustomerRepositoryInterface {
    private readonly customers;
    create(customer: CustomerEntity): Promise<CustomerEntity>;
    update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
    findById(id: string): Promise<CustomerEntity | null>;
    findByPhone(phone: string): Promise<CustomerEntity | null>;
    findAll(skip: number, take: number): Promise<PaginatedCustomers>;
    delete(id: string): Promise<void>;
}
