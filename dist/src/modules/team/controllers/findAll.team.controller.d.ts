import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { FindAllTeamMembersUseCase } from '../usecase/find-all-team-members.usecase';
export declare class FindAllTeamMembersController {
    private readonly findAllTeamMembersUseCase;
    constructor(findAllTeamMembersUseCase: FindAllTeamMembersUseCase);
    findAll(): Promise<TeamMemberResponseDto[]>;
}
