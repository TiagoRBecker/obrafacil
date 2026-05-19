import { CreateOrderDto } from './dto/create-budget.dto';
import { BudgetIdParamDto } from './dto/budget-id-param.dto';
import { DeleteBudgetResponseDto } from './dto/delete-budget-response.dto';
import { BudgetsService } from './budgets.service';
import { BudgetEntity } from './entity/budget.entity';
export declare class BudgetsController {
    private readonly budgetsService;
    constructor(budgetsService: BudgetsService);
    create(body: CreateOrderDto): Promise<BudgetEntity>;
    update(params: BudgetIdParamDto, body: CreateOrderDto): Promise<BudgetEntity>;
    delete(params: BudgetIdParamDto): Promise<DeleteBudgetResponseDto>;
    findAll(): Promise<BudgetEntity[]>;
    findById(params: BudgetIdParamDto): Promise<BudgetEntity>;
}
