import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { DeleteTeamMemberResponseDto } from './dto/delete-team-member-response.dto';
import { TeamMemberResponseDto } from './dto/team-member-response.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { CreateTeamMemberUseCase } from './usecase/create-team-member.usecase';
import { DeleteTeamMemberUseCase } from './usecase/delete-team-member.usecase';
import { FindAllTeamMembersUseCase } from './usecase/find-all-team-members.usecase';
import { FindTeamMemberByIdUseCase } from './usecase/find-team-member-by-id.usecase';
import { UpdateTeamMemberUseCase } from './usecase/update-team-member.usecase';
export declare class TeamService {
    private readonly createTeamMemberUseCase;
    private readonly updateTeamMemberUseCase;
    private readonly findTeamMemberByIdUseCase;
    private readonly findAllTeamMembersUseCase;
    private readonly deleteTeamMemberUseCase;
    constructor(createTeamMemberUseCase: CreateTeamMemberUseCase, updateTeamMemberUseCase: UpdateTeamMemberUseCase, findTeamMemberByIdUseCase: FindTeamMemberByIdUseCase, findAllTeamMembersUseCase: FindAllTeamMembersUseCase, deleteTeamMemberUseCase: DeleteTeamMemberUseCase);
    create(input: CreateTeamMemberDto): Promise<TeamMemberResponseDto>;
    update(id: string, input: UpdateTeamMemberDto): Promise<TeamMemberResponseDto>;
    findById(id: string): Promise<TeamMemberResponseDto>;
    findAll(): Promise<TeamMemberResponseDto[]>;
    delete(id: string): Promise<DeleteTeamMemberResponseDto>;
}
