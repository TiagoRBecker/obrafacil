import { GetConnectionUseCase } from '../usecase/findByConnection-usecase';
export declare class GetConnectionWhatsAppController {
    private readonly connectionService;
    constructor(connectionService: GetConnectionUseCase);
    connection(params: any): Promise<any>;
}
