import { FindAllTeamMembersUseCase } from '../usecase/find-all-team-members.usecase';
import { PaginationParams } from '../../../common/dto/pagination.dto';
import { PaginatedTeamResult } from '../dto/pagination-result.dto';
export declare class FindAllTeamMembersController {
    private readonly findAllTeamMembersUseCase;
    constructor(findAllTeamMembersUseCase: FindAllTeamMembersUseCase);
    findAll(query: PaginationParams): Promise<PaginatedTeamResult>;
}
