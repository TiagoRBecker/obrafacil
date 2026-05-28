import { IdParamDto } from '../../../common/dto/id-param.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { FindTeamMemberByIdUseCase } from '../usecase/find-team-member-by-id.usecase';
export declare class FindByIdTeamMemberController {
    private readonly findTeamMemberByIdUseCase;
    constructor(findTeamMemberByIdUseCase: FindTeamMemberByIdUseCase);
    findById(params: IdParamDto): Promise<TeamMemberResponseDto>;
}
