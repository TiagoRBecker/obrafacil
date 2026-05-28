import { Module } from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { CustomersController } from './controllers';
import { CustomersService } from './customers.service';
import { MockCustomerRepository } from './repo/mock-customer.repository';
import { CustomerRepositoryInterface } from './repo/customer-repository.interface';
import { CreateCustomerUseCase } from './usecase/create-customer.usecase';
import { DeleteCustomerUseCase } from './usecase/delete-customer.usecase';
import { FindAllCustomersUseCase } from './usecase/find-all-customers.usecase';
import { FindCustomerByIdUseCase } from './usecase/find-customer-by-id.usecase';
import { UpdateCustomerUseCase } from './usecase/update-customer.usecase';
import { CustomerRepo } from './repo/customer.repo';
import { PrismaService } from '../../db/prisma';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/user.module';

@Module({
 
  controllers: [...CustomersController],
   imports: [UserModule],
  providers: [
    CustomersService,
    CreateCustomerUseCase,
    UpdateCustomerUseCase,
    FindCustomerByIdUseCase,
    FindAllCustomersUseCase,
    DeleteCustomerUseCase,
    AdminTokenGuard,
    MockCustomerRepository,
    PrismaService,
    {
      provide: CustomerRepositoryInterface,
      useClass: CustomerRepo,
    },
  ],
  exports:[CustomerRepositoryInterface]
})
export class CustomersModule {}
