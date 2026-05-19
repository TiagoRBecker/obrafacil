import { BudgetRepositoryInterface } from '../../budgets/repo/budget.repository.interface';
import { EvoApiClient } from '../../evo/infra/evo-api.client';
export declare class SendMessageUseCase {
    private readonly orderRepo;
    private readonly evoClient;
    private readonly logger;
    constructor(orderRepo: BudgetRepositoryInterface, evoClient: EvoApiClient);
    execute(orderId: string): Promise<void>;
    private mapperObject;
    private formatDate;
    private formatCurrency;
}
