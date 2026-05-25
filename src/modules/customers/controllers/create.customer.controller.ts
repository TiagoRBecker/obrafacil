import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CreateCustomerUseCase } from '../usecase/create-customer.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class CreateCustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions('customer:create')
  create(@Body() body: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.createCustomerUseCase.execute(body);
  }
}
