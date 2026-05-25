import { TeamMemberIdParamDto } from '../dto/team-member-id-param.dto';
import { DeleteTeamMemberResponseDto } from '../dto/delete-team-member-response.dto';
import { DeleteTeamMemberUseCase } from '../usecase/delete-team-member.usecase';
export declare class DeleteTeamMemberController {
    private readonly deleteTeamMemberUseCase;
    constructor(deleteTeamMemberUseCase: DeleteTeamMemberUseCase);
    delete(params: TeamMemberIdParamDto): Promise<DeleteTeamMemberResponseDto>;
}
