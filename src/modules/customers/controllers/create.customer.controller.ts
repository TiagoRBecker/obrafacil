import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { CreateCustomerUseCase } from '../usecase/create-customer.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Clientes')
@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class CreateCustomerController {
  constructor(private readonly createCustomerUseCase: CreateCustomerUseCase) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions('customer:create')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Criar cliente',
    description: 'Cadastra um novo cliente no sistema. Requer permissão `customer:create` e papel ADMIN.',
  })
  @ApiBody({ type: CreateCustomerDto, description: 'Dados do cliente' })
  @ApiResponse({ status: 201, description: 'Cliente criado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  create(@Body() body: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.createCustomerUseCase.execute(body);
  }
}
