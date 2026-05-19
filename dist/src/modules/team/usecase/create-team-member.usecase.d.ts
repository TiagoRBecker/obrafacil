import { CreateTeamMemberDto } from '../dto/create-team-member.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
export declare class CreateTeamMemberUseCase {
    private readonly teamMemberRepository;
    private readonly logger;
    constructor(teamMemberRepository: TeamMemberRepositoryInterface);
    execute(input: CreateTeamMemberDto): Promise<TeamMemberResponseDto>;
}
