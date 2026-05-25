import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepositoryInterface } from './team-member.repository';

@Injectable()
export class TeamRepo extends TeamMemberRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(member: TeamMemberEntity): Promise<TeamMemberEntity> {
    const { email, jobTitle, name, phone } = member.data;

    const created = await this.prisma.team.create({
      data: { email, jobTitle, name, phone: phone ?? '' },
    });

    return TeamMemberEntity.toDTO({ ...created });
  }

  async update(id: string, member: TeamMemberEntity): Promise<TeamMemberEntity> {
    const { jobTitle, name } = member.data;

    const updated = await this.prisma.team.update({
      where: { id },
      data: { jobTitle, name },
    });

    return TeamMemberEntity.toDTO({ ...updated });
  }

  async findAll(): Promise<TeamMemberEntity[]> {
    const team = await this.prisma.team.findMany({
      include: { teamOrders: true },
    });

    return team.map((t) =>
      TeamMemberEntity.toDTO({
        email: t.email,
        jobTitle: t.jobTitle,
        name: t.name,
        id: t.id,
        phone: t.phone,
        status: t.status,
        teamsOrder: t.teamOrders,
      }),
    );
  }

  async findByEmail(email: string): Promise<TeamMemberEntity | null> {
    const team = await this.prisma.team.findUnique({ where: { email } });
    if (!team) return null;

    return TeamMemberEntity.toDTO({
      email: team.email,
      jobTitle: team.jobTitle,
      name: team.name,
      id: team.id,
      phone: team.phone,
      status: team.status,
    });
  }

  async findByPhone(phone: string): Promise<TeamMemberEntity | null> {
    const team = await this.prisma.team.findUnique({ where: { phone } });
    if (!team) return null;

    return TeamMemberEntity.toDTO({
      email: team.email,
      jobTitle: team.jobTitle,
      name: team.name,
      id: team.id,
      phone: team.phone,
      status: team.status,
    });
  }

  async findById(id: string): Promise<TeamMemberEntity | null> {
    const team = await this.prisma.team.findUnique({ where: { id } });
    if (!team) return null;

    return TeamMemberEntity.toDTO({
      email: team.email,
      jobTitle: team.jobTitle,
      name: team.name,
      id: team.id,
      phone: team.phone,
      status: team.status,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.team.delete({ where: { id } });
  }
}
