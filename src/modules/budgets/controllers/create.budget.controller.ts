import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { CreateBudgetUseCase } from '../usecase/create-budget.usecase';
import { BudgetEntity } from '../entity/budget.entity';
import { RequirePermissions, Roles } from '../../../../decorators';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { UserRole } from '../../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class CreateBudgetsController {
  constructor(private readonly createBudgetUseCase: CreateBudgetUseCase) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:create')
  create(@Body() body: CreateOrderDto): Promise<BudgetEntity> {
    return this.createBudgetUseCase.execute(body);
  }
}
