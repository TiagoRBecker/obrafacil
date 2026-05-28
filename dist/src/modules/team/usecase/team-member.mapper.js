"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMemberMapper = void 0;
class TeamMemberMapper {
    static toResponse(member) {
        const { email, jobTitle, name, createdAt, id, phone, status, updatedAt, teamsOrder } = member.data;
        return {
            id: id,
            name: name,
            jobTitle,
            email,
            phone,
            createdAt: createdAt,
            updatedAt: updatedAt,
            status: status,
            teamOrders: teamsOrder
        };
    }
}
exports.TeamMemberMapper = TeamMemberMapper;
//# sourceMappingURL=team-member.mapper.js.map