import { CustomerEntity, CustomerWithOrders } from '../entity/customer.entity';
export interface PaginatedCustomers {
    data: CustomerWithOrders[];
    total: number;
}
export declare abstract class CustomerRepositoryInterface {
    abstract create(customer: CustomerEntity): Promise<CustomerEntity>;
    abstract update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
    abstract findById(id: string): Promise<CustomerEntity | null>;
    abstract findByPhone(phone: string): Promise<CustomerEntity | null>;
    abstract findAll(skip: number, take: number): Promise<PaginatedCustomers>;
    abstract delete(id: string): Promise<void>;
}
