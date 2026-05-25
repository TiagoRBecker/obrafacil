"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const team_member_entity_1 = require("../entity/team-member.entity");
const team_member_repository_1 = require("./team-member.repository");
let TeamRepo = class TeamRepo extends team_member_repository_1.TeamMemberRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    async create(member) {
        const { email, jobTitle, name, phone } = member.data;
        const created = await this.prisma.team.create({
            data: { email, jobTitle, name, phone: phone ?? '' },
        });
        return team_member_entity_1.TeamMemberEntity.toDTO({ ...created });
    }
    async update(id, member) {
        const { jobTitle, name } = member.data;
        const updated = await this.prisma.team.update({
            where: { id },
            data: { jobTitle, name },
        });
        return team_member_entity_1.TeamMemberEntity.toDTO({ ...updated });
    }
    async findAll() {
        const team = await this.prisma.team.findMany({
            include: { teamOrders: true },
        });
        return team.map((t) => team_member_entity_1.TeamMemberEntity.toDTO({
            email: t.email,
            jobTitle: t.jobTitle,
            name: t.name,
            id: t.id,
            phone: t.phone,
            status: t.status,
            teamsOrder: t.teamOrders,
        }));
    }
    async findByEmail(email) {
        const team = await this.prisma.team.findUnique({ where: { email } });
        if (!team)
            return null;
        return team_member_entity_1.TeamMemberEntity.toDTO({
            email: team.email,
            jobTitle: team.jobTitle,
            name: team.name,
            id: team.id,
            phone: team.phone,
            status: team.status,
        });
    }
    async findByPhone(phone) {
        const team = await this.prisma.team.findUnique({ where: { phone } });
        if (!team)
            return null;
        return team_member_entity_1.TeamMemberEntity.toDTO({
            email: team.email,
            jobTitle: team.jobTitle,
            name: team.name,
            id: team.id,
            phone: team.phone,
            status: team.status,
        });
    }
    async findById(id) {
        const team = await this.prisma.team.findUnique({ where: { id } });
        if (!team)
            return null;
        return team_member_entity_1.TeamMemberEntity.toDTO({
            email: team.email,
            jobTitle: team.jobTitle,
            name: team.name,
            id: team.id,
            phone: team.phone,
            status: team.status,
        });
    }
    async delete(id) {
        await this.prisma.team.delete({ where: { id } });
    }
};
exports.TeamRepo = TeamRepo;
exports.TeamRepo = TeamRepo = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], TeamRepo);
//# sourceMappingURL=team-repo.js.map