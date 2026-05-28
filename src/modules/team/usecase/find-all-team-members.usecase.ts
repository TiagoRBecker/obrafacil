import { Injectable, Logger } from '@nestjs/common';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
import { TeamMemberMapper } from './team-member.mapper';
import { PaginatedTeamResult } from '../dto/pagination-result.dto';

@Injectable()
export class FindAllTeamMembersUseCase {
  private readonly logger = new Logger(FindAllTeamMembersUseCase.name);

  constructor(
    private readonly teamMemberRepository: TeamMemberRepositoryInterface,
  ) {}

  async execute(
    page: number = 1,
    limit: number = 10,
  ): Promise<PaginatedTeamResult> {
      this.logger.log(`Buscando equipe - página: ${page}, limite: ${limit}`);
    const { data, total } = await this.teamMemberRepository.findAll(
      page,
      limit,
    );
    this.logger.log(`Encontrados ${total} colaboradores no total, retornando ${data.length}`);

    return {
      data: data.map(TeamMemberMapper.toResponse),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
