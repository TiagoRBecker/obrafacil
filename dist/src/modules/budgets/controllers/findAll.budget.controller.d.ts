import { FindAllBudgetsUseCase, PaginatedBudgetsResult } from '../usecase/find-all-budgets.usecase';
import { PaginationParams } from '../../../common/dto/pagination.dto';
export declare class FindAllBudgetsController {
    private readonly findAllBudgetsUseCase;
    constructor(findAllBudgetsUseCase: FindAllBudgetsUseCase);
    findAll(query: PaginationParams): Promise<PaginatedBudgetsResult>;
}
