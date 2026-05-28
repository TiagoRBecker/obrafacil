import { FindAllCustomersUseCase, PaginatedCustomersResult } from '../usecase/find-all-customers.usecase';
import { PaginationParams } from '../../../common/dto/pagination.dto';
export declare class FindAllCustomersController {
    private readonly findAllCustomersUseCase;
    constructor(findAllCustomersUseCase: FindAllCustomersUseCase);
    findAll(query: PaginationParams): Promise<PaginatedCustomersResult>;
}
