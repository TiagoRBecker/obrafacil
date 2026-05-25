import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { FindBudgetByIdUseCase } from '../usecase/find-budget-by-id.usecase';
import { UserRole } from '../../../../decorators/types';
import { RequirePermissions, Roles } from '../../../../decorators';
import { BudgetIdParamDto } from '../dto/budget-id-param.dto';
import { BudgetEntity } from '../entity/budget.entity';

@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class FindByIdBudgetsController {
  constructor(private readonly findBudgetByIdUseCase: FindBudgetByIdUseCase) {}

  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get(':id')
  findById(@Param() params: BudgetIdParamDto): Promise<BudgetEntity> {
    return this.findBudgetByIdUseCase.execute(params.id);
  }
}
