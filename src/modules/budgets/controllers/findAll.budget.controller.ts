import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { FindAllBudgetsUseCase } from '../usecase/find-all-budgets.usecase';
import { UserRole } from '../../../../decorators/types';
import { RequirePermissions, Roles } from '../../../../decorators';
import { BudgetEntity } from '../entity/budget.entity';

@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class FindAllBudgetsController {
  constructor(private readonly findAllBudgetsUseCase: FindAllBudgetsUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get('all')
  findAll(): Promise<BudgetEntity[]> {
    return this.findAllBudgetsUseCase.execute();
  }

}
