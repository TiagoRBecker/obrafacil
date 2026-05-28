import { PrismaService } from '../../../db/prisma';
import { TeamMemberEntity } from '../entity/team-member.entity';
import { PaginatedTeam, TeamMemberRepositoryInterface } from './team-member.repository';
export declare class TeamRepo extends TeamMemberRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(member: TeamMemberEntity): Promise<TeamMemberEntity>;
    update(id: string, member: TeamMemberEntity): Promise<TeamMemberEntity>;
    findAll(skip: number, take: number): Promise<PaginatedTeam>;
    findByEmail(email: string): Promise<TeamMemberEntity | null>;
    findByPhone(phone: string): Promise<TeamMemberEntity | null>;
    findById(id: string): Promise<TeamMemberEntity | null>;
    delete(id: string): Promise<void>;
}
