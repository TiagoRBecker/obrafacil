import { Injectable } from '@nestjs/common';

import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { DeleteTeamMemberResponseDto } from './dto/delete-team-member-response.dto';
import { TeamMemberResponseDto } from './dto/team-member-response.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { CreateTeamMemberUseCase } from './usecase/create-team-member.usecase';
import { DeleteTeamMemberUseCase } from './usecase/delete-team-member.usecase';
import { FindAllTeamMembersUseCase } from './usecase/find-all-team-members.usecase';
import { FindTeamMemberByIdUseCase } from './usecase/find-team-member-by-id.usecase';
import { UpdateTeamMemberUseCase } from './usecase/update-team-member.usecase';
import { PaginatedTeamResult } from './dto/pagination-result.dto';

@Injectable()
export class TeamService {
  constructor(
    private readonly createTeamMemberUseCase: CreateTeamMemberUseCase,
    private readonly updateTeamMemberUseCase: UpdateTeamMemberUseCase,
    private readonly findTeamMemberByIdUseCase: FindTeamMemberByIdUseCase,
    private readonly findAllTeamMembersUseCase: FindAllTeamMembersUseCase,
    private readonly deleteTeamMemberUseCase: DeleteTeamMemberUseCase,
  ) {}

  create(input: CreateTeamMemberDto): Promise<TeamMemberResponseDto> {
    return this.createTeamMemberUseCase.execute(input);
  }

  update(id: string, input: UpdateTeamMemberDto): Promise<TeamMemberResponseDto> {
    return this.updateTeamMemberUseCase.execute(id, input);
  }

  findById(id: string): Promise<TeamMemberResponseDto> {
    return this.findTeamMemberByIdUseCase.execute(id);
  }

  findAll(page:number,limit:number): Promise<PaginatedTeamResult> {
    return this.findAllTeamMembersUseCase.execute();
  }

  delete(id: string): Promise<DeleteTeamMemberResponseDto> {
    return this.deleteTeamMemberUseCase.execute(id);
  }
}
