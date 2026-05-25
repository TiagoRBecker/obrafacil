import { CreateBudgetsController } from './create.budget.controller';
import { DeleteBudgetsController } from './delete.budget.controller';
import { FindAllBudgetsController } from './findAll.budget.controller';
import { FindByIdBudgetsController } from './findById.budget.controller';
import { UpdateBudgetsController } from './update.budget.controller';

export const BudgetsController = [
  CreateBudgetsController,
 
  FindAllBudgetsController,
   FindByIdBudgetsController,
  DeleteBudgetsController,
  UpdateBudgetsController,
];
