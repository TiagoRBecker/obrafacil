import { DeleteBudgetUseCase } from '../usecase/delete-budget.usecase';
import { DeleteBudgetResponseDto } from '../dto/delete-budget-response.dto';
import { BudgetIdParamDto } from '../dto/budget-id-param.dto';
export declare class DeleteBudgetsController {
    private readonly deleteBudgetUseCase;
    constructor(deleteBudgetUseCase: DeleteBudgetUseCase);
    delete(params: BudgetIdParamDto): Promise<DeleteBudgetResponseDto>;
}
