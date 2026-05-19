import { Injectable } from '@nestjs/common';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { DeleteCustomerResponseDto } from './dto/delete-customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CreateCustomerUseCase } from './usecase/create-customer.usecase';
import { DeleteCustomerUseCase } from './usecase/delete-customer.usecase';
import { FindAllCustomersUseCase } from './usecase/find-all-customers.usecase';
import { FindCustomerByIdUseCase } from './usecase/find-customer-by-id.usecase';
import { UpdateCustomerUseCase } from './usecase/update-customer.usecase';

@Injectable()
export class CustomersService {
  constructor(
    private readonly createCustomerUseCase: CreateCustomerUseCase,
    private readonly updateCustomerUseCase: UpdateCustomerUseCase,
    private readonly findCustomerByIdUseCase: FindCustomerByIdUseCase,
    private readonly findAllCustomersUseCase: FindAllCustomersUseCase,
    private readonly deleteCustomerUseCase: DeleteCustomerUseCase,
  ) {}

  create(input: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.createCustomerUseCase.execute(input);
  }

  update(id: string, input: UpdateCustomerDto): Promise<CustomerResponseDto> {
    return this.updateCustomerUseCase.execute(id, input);
  }

  findById(id: string): Promise<CustomerResponseDto> {
    return this.findCustomerByIdUseCase.execute(id);
  }

  findAll(): Promise<CustomerResponseDto[]> {
    return this.findAllCustomersUseCase.execute();
  }

  delete(id: string): Promise<DeleteCustomerResponseDto> {
    return this.deleteCustomerUseCase.execute(id);
  }
}
