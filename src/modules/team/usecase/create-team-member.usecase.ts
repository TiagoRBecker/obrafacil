import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
} from '@nestjs/common';

import { CreateTeamMemberDto } from '../dto/create-team-member.dto';
import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepositoryInterface } from '../repo/team-member.repository';
import { TeamMemberMapper } from './team-member.mapper';

@Injectable()
export class CreateTeamMemberUseCase {
  private readonly logger = new Logger(CreateTeamMemberUseCase.name);

  constructor(
    private readonly teamMemberRepository: TeamMemberRepositoryInterface,
  ) {}

  async execute(input: CreateTeamMemberDto): Promise<TeamMemberResponseDto> {
    this.logger.log(`Iniciando criação de membro da equipe - email: ${input.email}`);
    
    const [existingMember, existPhone] = await Promise.all([
      this.teamMemberRepository.findByEmail(input.email),
      this.teamMemberRepository.findByPhone(input.phone as string),
    ]);

    if (existingMember?.data?.email) {
      this.logger.warn(`Conflito: email já cadastrado - ${input.email}`);
      throw new ConflictException(
        'Já existe um usuário cadastrado com esse e-mail.',
      );
    }

    if (existPhone?.data?.phone) {
      this.logger.warn(`Conflito: telefone já cadastrado - ${input.phone}`);
      throw new ConflictException(
        'Já existe um usuário cadastrado com esse telefone.',
      );
    }
    
    try {
      this.logger.log(`Criando membro da equipe - nome: ${input.name}`);
      const member = TeamMemberEntity.create(input);

      const createdMember = await this.teamMemberRepository.create(member);
      this.logger.log(`Membro da equipe criado com sucesso - ID: ${createdMember.data.id}, nome: ${createdMember.data.name}`);
      return TeamMemberMapper.toResponse(createdMember);
    } catch (error) {
      this.logger.error(`Erro ao criar membro da equipe - email: ${input.email}, erro: ${error.message || error}`);
      throw new BadRequestException(`Erro ao criar o  novo colaborador `);
    }
  }
}
