import { DeleteBudgetUseCase } from '../usecase/delete-budget.usecase';
import { DeleteBudgetResponseDto } from '../dto/delete-budget-response.dto';
import { IdParamDto } from '../../../common/dto/id-param.dto';
export declare class DeleteBudgetsController {
    private readonly deleteBudgetUseCase;
    constructor(deleteBudgetUseCase: DeleteBudgetUseCase);
    delete(params: IdParamDto): Promise<DeleteBudgetResponseDto>;
}
