import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
export declare class UpdateTeamMemberUseCase {
    private readonly teamMemberRepository;
    private readonly logger;
    constructor(teamMemberRepository: TeamMemberRepositoryInterface);
    execute(id: string, input: UpdateTeamMemberDto): Promise<TeamMemberResponseDto>;
}
