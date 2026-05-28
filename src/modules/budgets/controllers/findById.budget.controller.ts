import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { FindBudgetByIdUseCase } from '../usecase/find-budget-by-id.usecase';
import { UserRole } from '../../../../decorators/types';
import { RequirePermissions, Roles } from '../../../../decorators';
import { IdParamDto } from '../../../common/dto/id-param.dto';
import { BudgetEntity } from '../entity/budget.entity';

@ApiTags('Orçamentos')
@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class FindByIdBudgetsController {
  constructor(private readonly findBudgetByIdUseCase: FindBudgetByIdUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get(':id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Buscar orçamento por ID',
    description: 'Retorna os dados de um orçamento específico baseado no seu ID. Requer permissão `order:read`.',
  })
  @ApiParam({ name: 'id', description: 'ID único do orçamento', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Orçamento encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Orçamento não encontrado.' })
  findById(@Param() params: IdParamDto): Promise<BudgetEntity> {
    return this.findBudgetByIdUseCase.execute(params.id);
  }
}
