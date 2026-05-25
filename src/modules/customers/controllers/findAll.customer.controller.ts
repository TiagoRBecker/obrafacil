import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { FindAllCustomersUseCase } from '../usecase/find-all-customers.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class FindAllCustomersController {
  constructor(private readonly findAllCustomersUseCase: FindAllCustomersUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('customer:read')
  @Get('all')
  findAll(): Promise<CustomerResponseDto[]> {
    return this.findAllCustomersUseCase.execute();
  }
}
