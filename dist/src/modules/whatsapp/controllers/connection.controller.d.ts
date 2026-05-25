import { ConnectionUseCase } from '../usecase/connection-instance.usecase';
export declare class ConnectionWhatsAppController {
    private readonly connectionService;
    constructor(connectionService: ConnectionUseCase);
    connection(body: {
        instanceName: string;
    }): Promise<any>;
}
