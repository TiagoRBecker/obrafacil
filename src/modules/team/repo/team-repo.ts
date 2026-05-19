import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepositoryInterface } from './team-member.repository';

@Injectable()
export class TeamRepo extends TeamMemberRepositoryInterface {
  private readonly logger = new Logger(TeamRepo.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async create(member: TeamMemberEntity): Promise<TeamMemberEntity> {
    const { email, jobTitle, name, phone, status } = member.data;
    try {
      const create = await this.prisma.team.create({
        data: {
          email,
          jobTitle,
          name,
          phone: phone as string,
        },
      });
      return TeamMemberEntity.toDTO({
        ...create,
      });
    } catch (error) {
      this.logger.error('Erro ao criar o colaborador ', {
        error,
        operation: 'CREATE',
        entity: 'TeamMemberEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível criar  o o colaborador . Tente novamente.`,
      );
    }
  }
 async  update(id:string, member: TeamMemberEntity): Promise<TeamMemberEntity> {
     const { jobTitle, name,} = member.data;
    try {
      const create = await this.prisma.team.update({
        where:{
          id
        },
        data: {
         
          jobTitle,
          name,
      
        },
      });
      return TeamMemberEntity.toDTO({
        ...create,
      });
    } catch (error) {
      this.logger.error('Erro ao criar o colaborador ', {
        error,
        operation: 'UPDATE',
        entity: 'TeamMemberEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível criar  o o colaborador . Tente novamente.`,
      );
    }
  }
  async findAll(): Promise<TeamMemberEntity[]> {
    try {
      const team = await this.prisma.team.findMany({
        include:{
          teamOrders:true
        }
      });
      return team.map((t) => {
        return TeamMemberEntity.toDTO({
          email: t?.email as string,
          jobTitle: t?.jobTitle as string,
          name: t?.name as string,
          id: t?.id,
          phone: t?.phone,
          status: t?.status,
          teamsOrder:t.teamOrders
        });
      });
    } catch (error) {
      this.logger.error('Erro ao buscar o colaborador ', {
        error,
        operation: 'FINDBYEMAIL',
        entity: 'TeamMemberEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível buscar  o o colaborador . Tente novamente.`,
      );
    }
  }
  async findByEmail(email: string): Promise<TeamMemberEntity | null> {
    try {
      const team = await this.prisma.team.findUnique({
        where: {
          email,
        },
      });
      return TeamMemberEntity.toDTO({
        email: team?.email as string,
        jobTitle: team?.jobTitle as string,
        name: team?.name as string,
        id: team?.id,
        phone: team?.phone,
        status: team?.status,
      });
    } catch (error) {
      this.logger.error('Erro ao buscar o colaborador ', {
        error,
        operation: 'FINDBYEMAIL',
        entity: 'TeamMemberEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível buscar  o o colaborador . Tente novamente.`,
      );
    }
  }
  async findByPhone(phone: string): Promise<TeamMemberEntity | null> {
    try {
      const team = await this.prisma.team.findUnique({
        where: {
          phone,
        },
      });
      return TeamMemberEntity.toDTO({
        email: team?.email as string,
        jobTitle: team?.jobTitle as string,
        name: team?.name as string,
        id: team?.id,
        phone: team?.phone,
        status: team?.status,
      });
    } catch (error) {
      this.logger.error('Erro ao buscar o colaborador ', {
        error,
        operation: 'FINDBYPHONE',
        entity: 'TeamMemberEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível buscar  o o colaborador . Tente novamente.`,
      );
    }
  }
  async findById(id: string): Promise<TeamMemberEntity | null> {
     try {
      const team = await this.prisma.team.findUnique({
        where: {
          id,
        },
      });
      return TeamMemberEntity.toDTO({
        email: team?.email as string,
        jobTitle: team?.jobTitle as string,
        name: team?.name as string,
        id: team?.id,
        phone: team?.phone,
        status: team?.status,
      });
    } catch (error) {
      this.logger.error('Erro ao buscar o colaborador ', {
        error,
        operation: 'FINDBYID',
        entity: 'TeamMemberEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível buscar  o o colaborador . Tente novamente.`,
      );
    }
  }
  async delete(id: string): Promise<void> {
    try {
       await this.prisma.team.delete({
        where: {
          id,
        },
      });
      return 
    } catch (error) {
      this.logger.error('Erro ao deletar o colaborador ', {
        error,
        operation: 'DELETE',
        entity: 'TeamMemberEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível deletar  o o colaborador . Tente novamente.`,
      );
    }
  }
}
