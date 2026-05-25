import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { FindAllCustomersUseCase } from '../usecase/find-all-customers.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Clientes')
@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class FindAllCustomersController {
  constructor(private readonly findAllCustomersUseCase: FindAllCustomersUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('customer:read')
  @Get('all')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Listar clientes',
    description: 'Retorna todos os clientes cadastrados. Requer permissão `customer:read`. Disponível para ADMIN e USER.',
  })
  @ApiResponse({ status: 200, description: 'Lista de clientes retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  findAll(): Promise<CustomerResponseDto[]> {
    return this.findAllCustomersUseCase.execute();
  }
}
