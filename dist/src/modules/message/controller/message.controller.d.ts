import { SendMessageUseCase } from '../usecase/sendMessage.service';
export declare class SenMessageController {
    private readonly sendMessage;
    constructor(sendMessage: SendMessageUseCase);
    create(body: {
        id: string;
    }): Promise<void>;
}
