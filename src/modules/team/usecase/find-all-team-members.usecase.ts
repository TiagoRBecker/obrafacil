import { Injectable, Logger } from '@nestjs/common';

import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
import { TeamMemberMapper } from './team-member.mapper';

@Injectable()
export class FindAllTeamMembersUseCase {
  private readonly logger = new Logger(FindAllTeamMembersUseCase.name);

  constructor(private readonly teamMemberRepository: TeamMemberRepositoryInterface) {}

  async execute(): Promise<TeamMemberResponseDto[]> {
    this.logger.log('Buscando todos os membros da equipe');
    const members = await this.teamMemberRepository.findAll();
    this.logger.log(`Encontrados ${members.length} membros da equipe`);
    return members.map(TeamMemberMapper.toResponse);
  }
}
