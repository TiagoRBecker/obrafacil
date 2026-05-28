import { UpdateBudgetUseCase } from '../usecase/update-budget.usecase';
import { IdParamDto } from '../../../common/dto/id-param.dto';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
export declare class UpdateBudgetsController {
    private readonly updateBudgetUseCase;
    constructor(updateBudgetUseCase: UpdateBudgetUseCase);
    update(params: IdParamDto, body: CreateOrderDto): Promise<BudgetEntity>;
}
