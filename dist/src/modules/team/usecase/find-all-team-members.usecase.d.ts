import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
export declare class FindAllTeamMembersUseCase {
    private readonly teamMemberRepository;
    private readonly logger;
    constructor(teamMemberRepository: TeamMemberRepositoryInterface);
    execute(): Promise<TeamMemberResponseDto[]>;
}
