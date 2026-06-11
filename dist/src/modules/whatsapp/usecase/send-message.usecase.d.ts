import { BudgetRepositoryInterface } from '../../budgets/repo/budget.repository.interface';
import { EvoApiClient } from '../../evo/infra/evo-api.client';
import { WhatsAppRepositoryInterface } from '../repo/whatsapp-repo-interface';
export declare class SendMessageUseCase {
    private readonly whatsappRepo;
    private readonly orderRepo;
    private readonly evoClient;
    private readonly logger;
    constructor(whatsappRepo: WhatsAppRepositoryInterface, orderRepo: BudgetRepositoryInterface, evoClient: EvoApiClient);
    execute(orderId: string, userId: string): Promise<void>;
    private mapperObject;
    private formatDate;
    private formatCurrency;
}
