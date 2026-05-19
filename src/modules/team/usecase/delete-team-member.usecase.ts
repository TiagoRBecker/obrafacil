import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { DeleteTeamMemberResponseDto } from '../dto/delete-team-member-response.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';

@Injectable()
export class DeleteTeamMemberUseCase {
  private readonly logger = new Logger(DeleteTeamMemberUseCase.name);

  constructor(private readonly teamMemberRepository: TeamMemberRepositoryInterface) {}

  async execute(id: string): Promise<DeleteTeamMemberResponseDto> {
    this.logger.log(`Iniciando exclusão de membro da equipe - ID: ${id}`);
    
    const existingMember = await this.teamMemberRepository.findById(id);

    if (!existingMember) {
      this.logger.error(`Membro da equipe não encontrado para exclusão - ID: ${id}`);
      throw new NotFoundException('Team member not found.');
    }

    await this.teamMemberRepository.delete(id);
    this.logger.log(`Membro da equipe excluído com sucesso - ID: ${id}`);

    return {
      id,
      deleted: true,
    };
  }
}
