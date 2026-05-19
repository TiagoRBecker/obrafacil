import { BudgetEntity } from '../entity/budget.entity';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
import { CreateOrderDto } from '../dto/create-budget.dto';
import { CustomerRepositoryInterface } from '../../customers/repo/customer.repo.inteface';
export declare class UpdateBudgetUseCase {
    private readonly budgetRepository;
    private readonly customerRepo;
    private readonly logger;
    constructor(budgetRepository: BudgetRepositoryInterface, customerRepo: CustomerRepositoryInterface);
    execute(id: string, input: CreateOrderDto): Promise<BudgetEntity>;
}
