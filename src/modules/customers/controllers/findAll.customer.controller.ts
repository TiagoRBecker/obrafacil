import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CustomerResponseDto } from '../dto/customer-response.dto';
import { FindAllCustomersUseCase, PaginatedCustomersResult } from '../usecase/find-all-customers.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';
import { PaginationParams } from '../../../common/dto/pagination.dto';

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
    summary: 'Listar clientes (paginado)',
    description: 'Retorna clientes cadastrados com paginação. Requer permissão `customer:read`. Disponível para ADMIN e USER.',
  })
  @ApiResponse({ status: 200, description: 'Lista paginada de clientes retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  findAll(@Query() query: PaginationParams): Promise<PaginatedCustomersResult> {
     console.log("Ok aqui chegou ")
    return this.findAllCustomersUseCase.execute(query.page, query.limit);
  }
}
