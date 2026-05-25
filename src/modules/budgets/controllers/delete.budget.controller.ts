import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { DeleteBudgetUseCase } from '../usecase/delete-budget.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';
import { DeleteBudgetResponseDto } from '../dto/delete-budget-response.dto';
import { BudgetIdParamDto } from '../dto/budget-id-param.dto';

@ApiTags('Orçamentos')
@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class DeleteBudgetsController {
  constructor(private readonly deleteBudgetUseCase: DeleteBudgetUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:delete')
  @Delete('delete/:id')
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Excluir orçamento',
    description: 'Remove um orçamento do sistema pelo seu ID. Requer permissão `order:delete` e papel ADMIN.',
  })
  @ApiParam({ name: 'id', description: 'ID único do orçamento a ser excluído', example: '550e8400-e29b-41d4-a716-446655440000' })
  @ApiResponse({ status: 200, description: 'Orçamento excluído com sucesso.' })
  @ApiResponse({ status: 404, description: 'Orçamento não encontrado.' })
  delete(@Param() params: BudgetIdParamDto): Promise<DeleteBudgetResponseDto> {
    return this.deleteBudgetUseCase.execute(params.id);
  }
  
}
