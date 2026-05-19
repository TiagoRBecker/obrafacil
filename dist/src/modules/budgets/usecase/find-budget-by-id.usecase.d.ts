import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { BudgetEntity } from '../entity/budget.entity';
export declare class FindBudgetByIdUseCase {
    private readonly budgetRepository;
    private readonly logger;
    constructor(budgetRepository: BudgetRepositoryInterface);
    execute(id: string): Promise<BudgetEntity>;
}
