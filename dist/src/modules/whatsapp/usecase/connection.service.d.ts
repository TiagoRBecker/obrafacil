import { EvoApiClient } from '../../evo/infra/evo-api.client';
export declare class ConnectionUSeCase {
    private readonly evoService;
    private readonly logger;
    constructor(evoService: EvoApiClient);
    execute(): Promise<any>;
}
