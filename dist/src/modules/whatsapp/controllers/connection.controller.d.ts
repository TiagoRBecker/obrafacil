import { ConnectionUseCase } from '../usecase/connection-instance.usecase';
export declare class ConnectionWhatsAppController {
    private readonly connectionService;
    constructor(connectionService: ConnectionUseCase);
    connection(req: any, body: {
        instanceName: string;
    }): Promise<any>;
}
