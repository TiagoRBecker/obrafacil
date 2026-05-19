import { CustomerEntity, CustomerWithOrders } from '../entity/customer.entity';
import { CustomerRepositoryInterface } from './customer.repo.inteface';
export declare class InMemoryCustomerRepository implements CustomerRepositoryInterface {
    private readonly customers;
    create(customer: CustomerEntity): Promise<CustomerEntity>;
    update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
    findById(id: string): Promise<CustomerEntity | null>;
    findByphone(id: string): Promise<CustomerEntity | null>;
    findAll(): Promise<CustomerWithOrders[]>;
    delete(id: string): Promise<void>;
}
