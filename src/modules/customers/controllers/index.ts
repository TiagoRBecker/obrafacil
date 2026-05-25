import { CreateCustomerController } from './create.customer.controller';
import { DeleteCustomerController } from './delete.customer.controller';
import { FindAllCustomersController } from './findAll.customer.controller';
import { FindByIdCustomerController } from './findById.customer.controller';
import { UpdateCustomerController } from './update.customer.controller';

export const CustomersController = [
  CreateCustomerController,
  FindAllCustomersController,
  FindByIdCustomerController,
  DeleteCustomerController,
  UpdateCustomerController,
];
