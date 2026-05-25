import {
  Controller,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { DeleteBudgetUseCase } from '../usecase/delete-budget.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { UserRole } from '../../../../decorators/types';
import { DeleteBudgetResponseDto } from '../dto/delete-budget-response.dto';
import { BudgetIdParamDto } from '../dto/budget-id-param.dto';

@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class DeleteBudgetsController {
  constructor(private readonly deleteBudgetUseCase: DeleteBudgetUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:delete')
  @Delete('delete/:id')
  delete(@Param() params: BudgetIdParamDto): Promise<DeleteBudgetResponseDto> {
    return this.deleteBudgetUseCase.execute(params.id);
  }
  
}
