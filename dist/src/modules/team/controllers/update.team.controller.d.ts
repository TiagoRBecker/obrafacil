import { IdParamDto } from '../../../common/dto/id-param.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';
import { UpdateTeamMemberUseCase } from '../usecase/update-team-member.usecase';
export declare class UpdateTeamMemberController {
    private readonly updateTeamMemberUseCase;
    constructor(updateTeamMemberUseCase: UpdateTeamMemberUseCase);
    update(params: IdParamDto, body: UpdateTeamMemberDto): Promise<TeamMemberResponseDto>;
}
