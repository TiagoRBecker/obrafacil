import { UpdateStatusConnectionUseCase } from './update-status-connection-usecase';
export declare class EventDispatcherService {
    private readonly UpdateStatusConnectionUseCase;
    private readonly logger;
    constructor(UpdateStatusConnectionUseCase: UpdateStatusConnectionUseCase);
    execute(payload: any): Promise<void>;
}
