import { TeamMemberResponseDto } from '../dto/team-member-response.dto';
import { TeamMemberEntity } from '../entity/team-member.entity';

export class TeamMemberMapper {
  static toResponse(member: TeamMemberEntity): TeamMemberResponseDto {
    const { email, jobTitle, name, createdAt, id, phone, status, updatedAt,teamsOrder  } = member.data
    
    return {
      id: id as string,
      name: name as string,
      jobTitle,
      email,
      phone,
      createdAt: createdAt as Date,
      updatedAt: updatedAt as Date,
      status: status as string,
      teamOrders:teamsOrder as []
    };
  }
}
