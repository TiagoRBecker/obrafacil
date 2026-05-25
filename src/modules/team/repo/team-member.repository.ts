import { TeamMemberEntity } from '../entity/team-member.entity';

export abstract class TeamMemberRepositoryInterface {
  abstract create(member: TeamMemberEntity): Promise<TeamMemberEntity>;
  abstract update(id:string,member: TeamMemberEntity): Promise<TeamMemberEntity>;
  abstract findById(id: string): Promise<TeamMemberEntity | null>;
  abstract findByEmail(email: string): Promise<TeamMemberEntity | null>;
  abstract findByPhone(phone: string): Promise<TeamMemberEntity | null>;
  abstract findAll(): Promise<TeamMemberEntity[]>;
  abstract delete(id: string): Promise<void>;
}
