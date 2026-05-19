import { ConnectionUSeCase } from '../usecase/connection.service';
import { WebHookUseCase } from '../usecase/update.status.webhook.service';
export declare class ConnectionController {
    private readonly connectionService;
    constructor(connectionService: ConnectionUSeCase);
    create(req: any, body: {
        instanceName: string;
    }): Promise<any>;
    connect(instanceName: string): {
        message: string;
        instanceName: string;
    };
    connectionState(instanceName: string): {
        message: string;
        instanceName: string;
    };
}
export declare class MessageController {
    sendMedia(instanceName: string, body: {
        mediaUrl: string;
        caption?: string;
    }): {
        message: string;
        instanceName: string;
        mediaUrl: string;
        caption: string | undefined;
    };
}
export declare class Webhook {
    private readonly updateEvents;
    constructor(updateEvents: WebHookUseCase);
    sendMedia(body: {
        event: string;
        data: {
            keyId: string;
            status: string;
        };
    }): Promise<any>;
}
