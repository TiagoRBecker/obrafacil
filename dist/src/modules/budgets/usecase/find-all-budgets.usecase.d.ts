import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { BudgetEntity } from '../entity/budget.entity';
export interface PaginatedBudgetsResult {
    data: BudgetEntity[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class FindAllBudgetsUseCase {
    private readonly budgetRepository;
    private readonly logger;
    constructor(budgetRepository: BudgetRepositoryInterface);
    execute(page?: number, limit?: number): Promise<PaginatedBudgetsResult>;
}
