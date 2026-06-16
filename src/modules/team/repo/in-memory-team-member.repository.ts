import { Injectable } from '@nestjs/common';

import { TeamMemberEntity } from '../entity/team-member.entity';
import {
  PaginatedTeam,
  TeamMemberRepositoryInterface,
} from './team-member.repository';
import { randomUUID } from 'node:crypto';

@Injectable()
export class InMemoryTeamMemberRepository implements TeamMemberRepositoryInterface {
  private readonly members = new Map<string, TeamMemberEntity>();

  async create(member: TeamMemberEntity): Promise<TeamMemberEntity> {
    const id = randomUUID();

    const entity = TeamMemberEntity.toDTO({
      ...member.data,
      id,
    });

    this.members.set(id, entity);

    return entity;
  }

  async update(
    id: string,
    member: TeamMemberEntity,
  ): Promise<TeamMemberEntity> {
    const entity = TeamMemberEntity.toDTO({
      ...member.data,
      id,
    });

    this.members.set(id, entity);

    return entity;
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

  async findAll(skip, take): Promise<PaginatedTeam> {
    const values = [...this.members.values()];
    return {
      data: values.slice(skip, skip + take) as any,
      total: values.length,
    };
  }

  async delete(id: string): Promise<void> {
    this.members.delete(id);
  }
}
