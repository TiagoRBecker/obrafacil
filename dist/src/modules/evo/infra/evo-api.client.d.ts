import { ConfigService } from '@nestjs/config';
import { SendMessageService } from '../domain/send-message.service.interface';
import { ConnectionService } from '../domain/connection.service.interface';
export declare class EvoApiClient implements ConnectionService, SendMessageService {
    private configService;
    private readonly logger;
    constructor(configService: ConfigService);
    private get baseUrl();
    private get headers();
    private get instanceName();
    private get webhookUrl();
    connect(instanceName: string): Promise<any>;
    create(instanceName: string): Promise<any>;
    getInstance(): Promise<any>;
    sendMessage(to: string, message: string): Promise<any>;
    sendMedia(to: string, mediaBase64: string, fileName: string, caption?: string): Promise<any>;
}
