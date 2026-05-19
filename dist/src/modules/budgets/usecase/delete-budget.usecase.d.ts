import { DeleteBudgetResponseDto } from '../dto/delete-budget-response.dto';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
export declare class DeleteBudgetUseCase {
    private readonly budgetRepository;
    private readonly logger;
    constructor(budgetRepository: BudgetRepositoryInterface);
    execute(id: string): Promise<DeleteBudgetResponseDto>;
}
