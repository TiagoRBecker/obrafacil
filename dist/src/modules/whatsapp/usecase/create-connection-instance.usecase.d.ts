import { EvoApiClient } from '../../evo/infra/evo-api.client';
import { WhatsAppRepositoryInterface } from '../repo/whatsapp-repo-interface';
export declare class CreateConnectionUseCase {
    private readonly evoService;
    private readonly whatsappRepo;
    private readonly logger;
    constructor(evoService: EvoApiClient, whatsappRepo: WhatsAppRepositoryInterface);
    execute(instanceName: string): Promise<any>;
}
