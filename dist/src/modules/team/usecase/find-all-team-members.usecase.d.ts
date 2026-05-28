import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
import { PaginatedTeamResult } from '../dto/pagination-result.dto';
export declare class FindAllTeamMembersUseCase {
    private readonly teamMemberRepository;
    private readonly logger;
    constructor(teamMemberRepository: TeamMemberRepositoryInterface);
    execute(page?: number, limit?: number): Promise<PaginatedTeamResult>;
}
