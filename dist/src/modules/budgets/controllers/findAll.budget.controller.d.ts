import { FindAllBudgetsUseCase } from '../usecase/find-all-budgets.usecase';
import { BudgetEntity } from '../entity/budget.entity';
export declare class FindAllBudgetsController {
    private readonly findAllBudgetsUseCase;
    constructor(findAllBudgetsUseCase: FindAllBudgetsUseCase);
    findAll(): Promise<BudgetEntity[]>;
}
