import { CreateOrderDto } from './dto/create-budget.dto';
import { DeleteBudgetResponseDto } from './dto/delete-budget-response.dto';
import { CreateBudgetUseCase } from './usecase/create-budget.usecase';
import { DeleteBudgetUseCase } from './usecase/delete-budget.usecase';
import { FindAllBudgetsUseCase, PaginatedBudgetsResult } from './usecase/find-all-budgets.usecase';
import { FindBudgetByIdUseCase } from './usecase/find-budget-by-id.usecase';
import { UpdateBudgetUseCase } from './usecase/update-budget.usecase';
import { BudgetEntity } from './entity/budget.entity';
export declare class BudgetsService {
    private readonly createBudgetUseCase;
    private readonly updateBudgetUseCase;
    private readonly findBudgetByIdUseCase;
    private readonly findAllBudgetsUseCase;
    private readonly deleteBudgetUseCase;
    constructor(createBudgetUseCase: CreateBudgetUseCase, updateBudgetUseCase: UpdateBudgetUseCase, findBudgetByIdUseCase: FindBudgetByIdUseCase, findAllBudgetsUseCase: FindAllBudgetsUseCase, deleteBudgetUseCase: DeleteBudgetUseCase);
    create(input: CreateOrderDto): Promise<BudgetEntity>;
    update(id: string, input: CreateOrderDto): Promise<BudgetEntity>;
    findById(id: string): Promise<BudgetEntity>;
    findAll(page?: number, limit?: number): Promise<PaginatedBudgetsResult>;
    delete(id: string): Promise<DeleteBudgetResponseDto>;
}
