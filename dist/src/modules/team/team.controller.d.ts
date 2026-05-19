import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { DeleteTeamMemberResponseDto } from './dto/delete-team-member-response.dto';
import { TeamMemberIdParamDto } from './dto/team-member-id-param.dto';
import { TeamMemberResponseDto } from './dto/team-member-response.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamService } from './team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(body: CreateTeamMemberDto): Promise<TeamMemberResponseDto>;
    update(params: TeamMemberIdParamDto, body: UpdateTeamMemberDto): Promise<TeamMemberResponseDto>;
    delete(params: TeamMemberIdParamDto): Promise<DeleteTeamMemberResponseDto>;
    findAll(): Promise<TeamMemberResponseDto[]>;
    findById(params: TeamMemberIdParamDto): Promise<TeamMemberResponseDto>;
}
