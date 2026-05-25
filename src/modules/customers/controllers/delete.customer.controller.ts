import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { DeleteCustomerResponseDto } from '../dto/delete-customer-response.dto';
import { DeleteCustomerUseCase } from '../usecase/delete-customer.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class DeleteCustomerController {
  constructor(private readonly deleteCustomerUseCase: DeleteCustomerUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('customer:update')
  @Delete('delete/:id')
  delete(
    @Param() params: CustomerIdParamDto,
  ): Promise<DeleteCustomerResponseDto> {
    return this.deleteCustomerUseCase.execute(params.id);
  }
}
