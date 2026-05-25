import { UpdateBudgetUseCase } from '../usecase/update-budget.usecase';
import { BudgetIdParamDto } from '../dto/budget-id-param.dto';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
export declare class UpdateBudgetsController {
    private readonly updateBudgetUseCase;
    constructor(updateBudgetUseCase: UpdateBudgetUseCase);
    update(params: BudgetIdParamDto, body: CreateOrderDto): Promise<BudgetEntity>;
}
