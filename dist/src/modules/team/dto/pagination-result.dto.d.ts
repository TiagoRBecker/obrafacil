import { TeamMemberResponseDto } from "./team-member-response.dto";
export interface PaginatedTeamResult {
    data: TeamMemberResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
