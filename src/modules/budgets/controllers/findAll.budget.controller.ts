import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { FindAllBudgetsUseCase } from '../usecase/find-all-budgets.usecase';
import { UserRole } from '../../../../decorators/types';
import { RequirePermissions, Roles } from '../../../../decorators';
import { BudgetEntity } from '../entity/budget.entity';

@ApiTags('Orçamentos')
@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class FindAllBudgetsController {
  constructor(private readonly findAllBudgetsUseCase: FindAllBudgetsUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get('all')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Listar orçamentos',
    description: 'Retorna todos os orçamentos cadastrados. Requer permissão `order:read`. Disponível para ADMIN e USER.',
  })
  @ApiResponse({ status: 200, description: 'Lista de orçamentos retornada com sucesso.' })
  @ApiResponse({ status: 401, description: 'Token de acesso ausente ou inválido.' })
  findAll(): Promise<BudgetEntity[]> {
    return this.findAllBudgetsUseCase.execute();
  }

}
