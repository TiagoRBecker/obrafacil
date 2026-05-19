import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';

import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { UpdateTeamMemberDto } from '../dto/update-team-member.dto';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
import { TeamMemberMapper } from './team-member.mapper';
import { TeamMemberEntity } from '../entity/team-member.entity';

@Injectable()
export class UpdateTeamMemberUseCase {
  private readonly logger = new Logger(UpdateTeamMemberUseCase.name);

  constructor(private readonly teamMemberRepository: TeamMemberRepositoryInterface) {}

  async execute(
    id: string,
    input: UpdateTeamMemberDto,
  ): Promise<TeamMemberResponseDto> {
    this.logger.log(`Iniciando atualização de membro da equipe - ID: ${id}`);
    
    const existingMember = await this.teamMemberRepository.findById(id);

    if (!existingMember?.data.id) {
      this.logger.error(`Membro da equipe não encontrado - ID: ${id}`);
      throw new NotFoundException('Team member not found.');
    }

    this.logger.log(`Atualizando membro da equipe - nome: ${input.name}`);
   
    const update = TeamMemberEntity.create({
      email:input.email as string,
      jobTitle:input.jobTitle as string,
      phone:input.phone as string,
      name:input.name as string,
      
    })

  
    const savedMember = await this.teamMemberRepository.update(existingMember.data.id as string,update);
    this.logger.log(`Membro da equipe atualizado com sucesso - ID: ${id}`);

    return TeamMemberMapper.toResponse(savedMember);
  }
}
