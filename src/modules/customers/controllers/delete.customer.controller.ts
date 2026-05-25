import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { DeleteCustomerResponseDto } from '../dto/delete-customer-response.dto';
import { DeleteCustomerUseCase } from '../usecase/delete-customer.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Clientes')
@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class DeleteCustomerController {
  constructor(private readonly deleteCustomerUseCase: DeleteCustomerUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('customer:update')
  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Excluir cliente',
    description: 'Remove um cliente do sistema pelo seu ID. Requer permissão `customer:update` e papel ADMIN.',
  })
  @ApiParam({ name: 'id', description: 'ID único do cliente a ser excluído', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Cliente excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  delete(
    @Param() params: CustomerIdParamDto,
  ): Promise<DeleteCustomerResponseDto> {
    return this.deleteCustomerUseCase.execute(params.id);
  }
}
