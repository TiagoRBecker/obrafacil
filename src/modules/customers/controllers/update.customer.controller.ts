import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { UpdateCustomerUseCase } from '../usecase/update-customer.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerUseCase: UpdateCustomerUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('customer:update')
  @Patch('update/:id')
  update(
    @Param() params: CustomerIdParamDto,
    @Body() body: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.updateCustomerUseCase.execute(params.id, body);
  }
}
