import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberEntity } from '../entity/team-member.entity';
export declare class TeamMemberMapper {
    static toResponse(member: TeamMemberEntity): TeamMemberResponseDto;
}
