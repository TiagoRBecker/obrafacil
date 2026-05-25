import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { FindCustomerByIdUseCase } from '../usecase/find-customer-by-id.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class FindByIdCustomerController {
  constructor(private readonly findCustomerByIdUseCase: FindCustomerByIdUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('customer:read')
  @Get(':id')
  findById(@Param() params: CustomerIdParamDto): Promise<CustomerResponseDto> {
    return this.findCustomerByIdUseCase.execute(params.id);
  }
}
