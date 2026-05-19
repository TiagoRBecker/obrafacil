import { CustomerEntity } from '../entity/customer.entity';
export declare abstract class CustomerRepositoryInterface {
    abstract create(customer: CustomerEntity): Promise<CustomerEntity>;
    abstract update(id: string, customer: CustomerEntity): Promise<CustomerEntity>;
    abstract findById(id: string): Promise<CustomerEntity | null>;
    abstract findByphone(phone: string): Promise<CustomerEntity | null>;
    abstract findAll(): Promise<CustomerEntity[]>;
    abstract delete(id: string): Promise<void>;
}
