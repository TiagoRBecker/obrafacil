import { TeamMemberEntity } from '../entity/team-member.entity';
import { TeamMemberRepositoryInterface } from './team-member.repository';
export declare class InMemoryTeamMemberRepository implements TeamMemberRepositoryInterface {
    private readonly members;
    create(member: TeamMemberEntity): Promise<TeamMemberEntity>;
    update(id: string, member: TeamMemberEntity): Promise<TeamMemberEntity>;
    findById(id: string): Promise<TeamMemberEntity | null>;
    findByEmail(email: string): Promise<TeamMemberEntity | null>;
    findByPhone(email: string): Promise<TeamMemberEntity | null>;
    findAll(): Promise<TeamMemberEntity[]>;
    delete(id: string): Promise<void>;
}
