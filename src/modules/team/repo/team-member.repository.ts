import { TeamMemberEntity } from '../entity/team-member.entity';
export interface PaginatedTeam {
  data: TeamMemberEntity[];
  total: number;
}
export abstract class TeamMemberRepositoryInterface {
  abstract create(member: TeamMemberEntity): Promise<TeamMemberEntity>;
  abstract update(id:string,member: TeamMemberEntity): Promise<TeamMemberEntity>;
  abstract findById(id: string): Promise<TeamMemberEntity | null>;
  abstract findByEmail(email: string): Promise<TeamMemberEntity | null>;
  abstract findByPhone(phone: string): Promise<TeamMemberEntity | null>;
  abstract findAll(page:number, skip:number): Promise<PaginatedTeam>;
  abstract delete(id: string): Promise<void>;
}
