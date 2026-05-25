import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CreateBudgetUseCase } from '../usecase/create-budget.usecase';
import { BudgetEntity } from '../entity/budget.entity';
import { RequirePermissions, Roles } from '../../../../decorators';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { UserRole } from '../../../../decorators/types';

@ApiTags('Orçamentos')
@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class CreateBudgetsController {
  constructor(private readonly createBudgetUseCase: CreateBudgetUseCase) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:create')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Criar orçamento',
    description: 'Cria um novo orçamento com dados do cliente, serviços, materiais, datas e valores. Requer permissão `order:create` e papel ADMIN.',
  })
  @ApiBody({ type: CreateOrderDto, description: 'Dados completos do orçamento' })
  @ApiResponse({ status: 201, description: 'Orçamento criado com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  @ApiResponse({ status: 403, description: 'Permissão negada. Requer papel ADMIN e permissão order:create.' })
  create(@Body() body: CreateOrderDto): Promise<BudgetEntity> {
    return this.createBudgetUseCase.execute(body);
  }
}
