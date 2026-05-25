import { Injectable } from '@nestjs/common';


import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepositoryInterface } from './team-member.repository';

@Injectable()
export class MockTeamMemberRepository implements TeamMemberRepositoryInterface {
  private readonly members = new Map<string, TeamMemberEntity>([
    [
      'team-1',
      TeamMemberEntity.create({
        id: 'team-1',
        name: 'Joao Mendonca',
        jobTitle: 'Electrician',
        email: 'joao@eletrica.com',
        phone: '(11) 98765-4321',
        status:"FREE",
        createdAt: new Date('2026-03-01T10:00:00.000Z'),
        updatedAt: new Date('2026-03-01T10:00:00.000Z'),
      }),
    ],
    [
      'team-2',
      TeamMemberEntity.create({
        id: 'team-2',
        name: 'Carlos Pereira',
        jobTitle: 'Electrical Assistant',
        email: 'carlos@eletrica.com',
        phone: '(11) 97654-3210',
        status :"FREE",
        createdAt: new Date('2026-03-02T10:00:00.000Z'),
        updatedAt: new Date('2026-03-02T10:00:00.000Z'),
      }),
    ],
    [
      'team-3',
      TeamMemberEntity.create({
        id: 'team-3',
        name: 'Marcos Silva',
        jobTitle: 'Technician',
        email: 'marcos@eletrica.com',
        phone: '(11) 96543-2109',
        status:"FREE",
        createdAt: new Date('2026-03-03T10:00:00.000Z'),
        updatedAt: new Date('2026-03-03T10:00:00.000Z'),
      }),
    ],
  ]);

  async create(member: TeamMemberEntity): Promise<TeamMemberEntity> {
    this.members.set(member.data?.id as string, member);
    return member;
  }

  async update(id:string,member: TeamMemberEntity): Promise<TeamMemberEntity> {
    this.members.set(member.data?.id as string, member);
    return member;
  }

  async findById(id: string): Promise<TeamMemberEntity | null> {
    return this.members.get(id) ?? null;
  }

  async findByEmail(email: string): Promise<TeamMemberEntity | null> {
    const normalizedEmail = email.toLowerCase();

    for (const member of this.members.values()) {
      if (member.data.email === normalizedEmail) {
        return member;
      }
    }


    return null;
  }

  async findByPhone(phone: string): Promise<TeamMemberEntity | null> {
    for (const member of this.members.values()) {
      if (member.data.phone === phone) {
        return member;
      }
    }

    return null;
  }
  async findAll(): Promise<TeamMemberEntity[]> {
    return [...this.members.values()];
  }

  async delete(id: string): Promise<void> {
    this.members.delete(id);
  }
}
