import { CreateOrderDto } from '../dto/create-budget.dto';
import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { CustomerRepositoryInterface } from '../../customers/repo/customer-repository.interface';
export declare class CreateBudgetUseCase {
    private readonly budgetRepository;
    private readonly customerRepo;
    private readonly logger;
    constructor(budgetRepository: BudgetRepositoryInterface, customerRepo: CustomerRepositoryInterface);
    execute(input: CreateOrderDto): Promise<BudgetEntity>;
}
