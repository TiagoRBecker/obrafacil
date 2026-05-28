import { EventDispatcherService } from '../usecase/event-dispatcher.usecase';
export declare class WebhookController {
    private readonly eventWebhook;
    constructor(eventWebhook: EventDispatcherService);
    sendMedia(body: any): Promise<void>;
}
