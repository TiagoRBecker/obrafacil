import { CreateTeamMemberDto } from '../dto/create-team-member.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { CreateTeamMemberUseCase } from '../usecase/create-team-member.usecase';
export declare class CreateTeamMemberController {
    private readonly createTeamMemberUseCase;
    constructor(createTeamMemberUseCase: CreateTeamMemberUseCase);
    create(body: CreateTeamMemberDto): Promise<TeamMemberResponseDto>;
}
