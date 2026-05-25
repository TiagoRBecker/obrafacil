import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { UpdateCustomerUseCase } from '../usecase/update-customer.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Clientes')
@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class UpdateCustomerController {
  constructor(private readonly updateCustomerUseCase: UpdateCustomerUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('customer:update')
  @Patch('update/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Atualizar cliente',
    description: 'Atualiza os dados de um cliente existente. Requer permissão `customer:update` e papel ADMIN.',
  })
  @ApiParam({ name: 'id', description: 'ID único do cliente a ser atualizado', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: UpdateCustomerDto, description: 'Dados atualizados do cliente' })
  @ApiResponse({ status: 200, description: 'Cliente atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  update(
    @Param() params: CustomerIdParamDto,
    @Body() body: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.updateCustomerUseCase.execute(params.id, body);
  }
}
