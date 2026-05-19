import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
import { TeamMemberMapper } from './team-member.mapper';

@Injectable()
export class FindTeamMemberByIdUseCase {
  private readonly logger = new Logger(FindTeamMemberByIdUseCase.name);

  constructor(private readonly teamMemberRepository: TeamMemberRepositoryInterface) {}

  async execute(id: string): Promise<TeamMemberResponseDto> {
    this.logger.log(`Buscando membro da equipe por ID: ${id}`);
    
    const member = await this.teamMemberRepository.findById(id);

    if (!member) {
      this.logger.error(`Membro da equipe não encontrado - ID: ${id}`);
      throw new NotFoundException('Team member not found.');
    }

    this.logger.log(`Membro da equipe encontrado - ID: ${id}, nome: ${member.data.name}`);
    return TeamMemberMapper.toResponse(member);
  }
}
