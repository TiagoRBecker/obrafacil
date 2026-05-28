import { FindBudgetByIdUseCase } from '../usecase/find-budget-by-id.usecase';
import { IdParamDto } from '../../../common/dto/id-param.dto';
import { BudgetEntity } from '../entity/budget.entity';
export declare class FindByIdBudgetsController {
    private readonly findBudgetByIdUseCase;
    constructor(findBudgetByIdUseCase: FindBudgetByIdUseCase);
    findById(params: IdParamDto): Promise<BudgetEntity>;
}
