import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserRole } from '../../../../decorators/types';
import { UpdateBudgetUseCase } from '../usecase/update-budget.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { IdParamDto } from '../../../common/dto/id-param.dto';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';

@ApiTags('Orçamentos')
@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class UpdateBudgetsController {
  constructor(private readonly updateBudgetUseCase: UpdateBudgetUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:update')
  @Patch('update/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Atualizar orçamento',
    description: 'Atualiza os dados de um orçamento existente. Requer permissão `order:update` e papel ADMIN.',
  })
  @ApiParam({ name: 'id', description: 'ID único do orçamento a ser atualizado', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiBody({ type: CreateOrderDto, description: 'Dados atualizados do orçamento' })
  @ApiResponse({ status: 200, description: 'Orçamento atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Orçamento não encontrado.' })
  update(
    @Param() params: IdParamDto,
    @Body() body: CreateOrderDto,
  ): Promise<BudgetEntity> {
    return this.updateBudgetUseCase.execute(params.id, body);
  }

}
