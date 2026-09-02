import { Module } from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';

import { BudgetsService } from './budgets.service';
import { BudgetRepositoryInterface } from './repo/budget.repository.interface';
import { CreateBudgetUseCase } from './usecase/create-budget.usecase';
import { DeleteBudgetUseCase } from './usecase/delete-budget.usecase';
import { FindAllBudgetsUseCase } from './usecase/find-all-budgets.usecase';
import { FindBudgetByIdUseCase } from './usecase/find-budget-by-id.usecase';
import { UpdateBudgetUseCase } from './usecase/update-budget.usecase';
import { BudgetRepo } from './repo/budgets.repo';
import { PrismaService } from '../../db/prisma';
import { CustomersModule } from '../customers/customers.module';
import { UpdateOrderStatusUseCase } from './usecase/update-status-order.usecase';
import { UserModule } from '../users/user.module';
import { BudgetsController } from './controllers';

@Module({
  controllers: [...BudgetsController],
  imports:[CustomersModule,UserModule],
  
  providers: [
    {
      provide: BudgetRepositoryInterface,
      useClass: BudgetRepo,
    },
    PrismaService,
    BudgetsService,
    CreateBudgetUseCase,
    UpdateBudgetUseCase,
    FindBudgetByIdUseCase,
    FindAllBudgetsUseCase,
    DeleteBudgetUseCase,
    AdminTokenGuard,
    UpdateOrderStatusUseCase,
  ],
exports:[BudgetRepositoryInterface,UpdateOrderStatusUseCase]
})
export class BudgetsModule {}
