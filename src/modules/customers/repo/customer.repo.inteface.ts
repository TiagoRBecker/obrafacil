import { CustomerEntity, CustomerWithOrders } from '../entity/customer.entity';

export abstract class CustomerRepositoryInterface {
  abstract create(customer: CustomerEntity): Promise<CustomerEntity>;
  abstract update(id:string, customer: CustomerEntity): Promise<CustomerEntity>;
  abstract findById(id: string): Promise<CustomerEntity | null>;
   abstract findByphone(phone: string): Promise<CustomerEntity | null>;
  abstract findAll(): Promise<CustomerWithOrders[]>;
  abstract delete(id: string): Promise<void>;
}
