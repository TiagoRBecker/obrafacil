import { UpdateOrderStatusUseCase } from '../../budgets/usecase/update-status-order.usecase';
export declare class WebHookUseCase {
    private readonly updateOrder;
    private readonly logger;
    constructor(updateOrder: UpdateOrderStatusUseCase);
    execute(input: {
        event: string;
        data: {
            keyId: string;
            status: string;
        };
    }): Promise<any>;
}
