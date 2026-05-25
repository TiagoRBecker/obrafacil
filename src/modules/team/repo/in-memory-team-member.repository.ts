import { Injectable } from '@nestjs/common';

import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepositoryInterface } from './team-member.repository';

@Injectable()
export class InMemoryTeamMemberRepository implements TeamMemberRepositoryInterface {
  private readonly members = new Map<string, TeamMemberEntity>();

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
