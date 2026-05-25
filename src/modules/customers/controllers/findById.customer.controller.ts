import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerIdParamDto } from '../dto/customer-id-param.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { FindCustomerByIdUseCase } from '../usecase/find-customer-by-id.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Clientes')
@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class FindByIdCustomerController {
  constructor(private readonly findCustomerByIdUseCase: FindCustomerByIdUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('customer:read')
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar cliente por ID',
    description: 'Retorna os dados de um cliente específico. Requer permissão `customer:read`. Disponível para ADMIN e USER.',
  })
  @ApiParam({ name: 'id', description: 'ID único do cliente', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Cliente encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cliente não encontrado.' })
  findById(@Param() params: CustomerIdParamDto): Promise<CustomerResponseDto> {
    return this.findCustomerByIdUseCase.execute(params.id);
  }
}
