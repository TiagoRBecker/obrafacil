import { CreateInstanceNameUseCase } from '../usecase/create-instance-usecase';
export declare class CreateInstanceController {
    private readonly createInstanceUseCase;
    constructor(createInstanceUseCase: CreateInstanceNameUseCase);
    create(req: any, body: {
        instanceName: string;
    }): Promise<string>;
}
