import { DeleteTeamMemberResponseDto } from '../dto/delete-team-member-response.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
export declare class DeleteTeamMemberUseCase {
    private readonly teamMemberRepository;
    private readonly logger;
    constructor(teamMemberRepository: TeamMemberRepositoryInterface);
    execute(id: string): Promise<DeleteTeamMemberResponseDto>;
}
