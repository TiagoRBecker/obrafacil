import { SendMessageUseCase } from '../usecase/send-message.usecase';
export declare class SendMessageController {
    private readonly sendMessage;
    constructor(sendMessage: SendMessageUseCase);
    create(body: {
        id: string;
    }): Promise<void>;
}
