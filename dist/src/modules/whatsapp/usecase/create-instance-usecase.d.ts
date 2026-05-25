import { EvoApiClient } from '../../evo/infra/evo-api.client';
export declare class CreateInstanceNameUseCase {
    private readonly evoService;
    constructor(evoService: EvoApiClient);
    execute(instanceName: string): Promise<string>;
}
