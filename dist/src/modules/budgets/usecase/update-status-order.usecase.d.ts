import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';
export declare class UpdateOrderStatusUseCase {
    private readonly orderRepository;
    private readonly logger;
    constructor(orderRepository: BudgetRepositoryInterface);
    execute(messageId: string, status: string): Promise<void>;
}
