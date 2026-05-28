import { CreateConnectionUseCase } from '../usecase/create-connection-instance.usecase';
export declare class ConnectionWhatsAppController {
    private readonly connectionService;
    constructor(connectionService: CreateConnectionUseCase);
    connection(body: {
        instanceName: string;
    }): Promise<any>;
}
