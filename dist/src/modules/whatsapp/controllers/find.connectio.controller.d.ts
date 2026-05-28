import { IdParamDto } from '../../../common/dto/id-param.dto';
import { GetConnectionUseCase } from '../usecase/findByConnection-usecase';
export declare class GetConnectionWhatsAppController {
    private readonly connectionService;
    constructor(connectionService: GetConnectionUseCase);
    connection(params: IdParamDto): Promise<any>;
}
