import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
export declare class FindTeamMemberByIdUseCase {
    private readonly teamMemberRepository;
    private readonly logger;
    constructor(teamMemberRepository: TeamMemberRepositoryInterface);
    execute(id: string): Promise<TeamMemberResponseDto>;
}
