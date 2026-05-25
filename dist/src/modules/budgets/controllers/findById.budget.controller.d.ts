import { FindBudgetByIdUseCase } from '../usecase/find-budget-by-id.usecase';
import { BudgetIdParamDto } from '../dto/budget-id-param.dto';
import { BudgetEntity } from '../entity/budget.entity';
export declare class FindByIdBudgetsController {
    private readonly findBudgetByIdUseCase;
    constructor(findBudgetByIdUseCase: FindBudgetByIdUseCase);
    findById(params: BudgetIdParamDto): Promise<BudgetEntity>;
}
