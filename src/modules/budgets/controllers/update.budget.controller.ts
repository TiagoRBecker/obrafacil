import {
  Body,
  Controller,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from '../../../../decorators/types';
import { UpdateBudgetUseCase } from '../usecase/update-budget.usecase';
import { RequirePermissions, Roles } from '../../../../decorators';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { BudgetIdParamDto } from '../dto/budget-id-param.dto';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';

@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class UpdateBudgetsController {
  constructor(private readonly updateBudgetUseCase: UpdateBudgetUseCase) {}

  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:update')
  @Patch('update/:id')
  update(
    @Param() params: BudgetIdParamDto,
    @Body() body: CreateOrderDto,
  ): Promise<BudgetEntity> {
    return this.updateBudgetUseCase.execute(params.id, body);
  }

}
