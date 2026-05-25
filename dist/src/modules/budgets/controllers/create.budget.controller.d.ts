import { CreateBudgetUseCase } from '../usecase/create-budget.usecase';
import { BudgetEntity } from '../entity/budget.entity';
import { CreateOrderDto } from '../dto/create-budget.dto';
export declare class CreateBudgetsController {
    private readonly createBudgetUseCase;
    constructor(createBudgetUseCase: CreateBudgetUseCase);
    create(body: CreateOrderDto): Promise<BudgetEntity>;
}
