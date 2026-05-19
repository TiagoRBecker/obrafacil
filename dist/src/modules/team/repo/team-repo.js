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
var TeamRepo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const team_member_entity_1 = require("../entity/team-member.entity");
const team_member_repository_1 = require("./team-member.repository");
let TeamRepo = TeamRepo_1 = class TeamRepo extends team_member_repository_1.TeamMemberRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.logger = new common_1.Logger(TeamRepo_1.name);
    }
    async create(member) {
        const { email, jobTitle, name, phone, status } = member.data;
        try {
            const create = await this.prisma.team.create({
                data: {
                    email,
                    jobTitle,
                    name,
                    phone: phone,
                },
            });
            return team_member_entity_1.TeamMemberEntity.toDTO({
                ...create,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar o colaborador ', {
                error,
                operation: 'CREATE',
                entity: 'TeamMemberEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível criar  o o colaborador . Tente novamente.`);
        }
    }
    async update(id, member) {
        const { jobTitle, name, } = member.data;
        try {
            const create = await this.prisma.team.update({
                where: {
                    id
                },
                data: {
                    jobTitle,
                    name,
                },
            });
            return team_member_entity_1.TeamMemberEntity.toDTO({
                ...create,
            });
        }
        catch (error) {
            this.logger.error('Erro ao criar o colaborador ', {
                error,
                operation: 'UPDATE',
                entity: 'TeamMemberEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível criar  o o colaborador . Tente novamente.`);
        }
    }
    async findAll() {
        try {
            const team = await this.prisma.team.findMany({
                include: {
                    teamOrders: true
                }
            });
            return team.map((t) => {
                return team_member_entity_1.TeamMemberEntity.toDTO({
                    email: t?.email,
                    jobTitle: t?.jobTitle,
                    name: t?.name,
                    id: t?.id,
                    phone: t?.phone,
                    status: t?.status,
                    teamsOrder: t.teamOrders
                });
            });
        }
        catch (error) {
            this.logger.error('Erro ao buscar o colaborador ', {
                error,
                operation: 'FINDBYEMAIL',
                entity: 'TeamMemberEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível buscar  o o colaborador . Tente novamente.`);
        }
    }
    async findByEmail(email) {
        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    email,
                },
            });
            return team_member_entity_1.TeamMemberEntity.toDTO({
                email: team?.email,
                jobTitle: team?.jobTitle,
                name: team?.name,
                id: team?.id,
                phone: team?.phone,
                status: team?.status,
            });
        }
        catch (error) {
            this.logger.error('Erro ao buscar o colaborador ', {
                error,
                operation: 'FINDBYEMAIL',
                entity: 'TeamMemberEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível buscar  o o colaborador . Tente novamente.`);
        }
    }
    async findByPhone(phone) {
        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    phone,
                },
            });
            return team_member_entity_1.TeamMemberEntity.toDTO({
                email: team?.email,
                jobTitle: team?.jobTitle,
                name: team?.name,
                id: team?.id,
                phone: team?.phone,
                status: team?.status,
            });
        }
        catch (error) {
            this.logger.error('Erro ao buscar o colaborador ', {
                error,
                operation: 'FINDBYPHONE',
                entity: 'TeamMemberEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível buscar  o o colaborador . Tente novamente.`);
        }
    }
    async findById(id) {
        try {
            const team = await this.prisma.team.findUnique({
                where: {
                    id,
                },
            });
            return team_member_entity_1.TeamMemberEntity.toDTO({
                email: team?.email,
                jobTitle: team?.jobTitle,
                name: team?.name,
                id: team?.id,
                phone: team?.phone,
                status: team?.status,
            });
        }
        catch (error) {
            this.logger.error('Erro ao buscar o colaborador ', {
                error,
                operation: 'FINDBYID',
                entity: 'TeamMemberEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível buscar  o o colaborador . Tente novamente.`);
        }
    }
    async delete(id) {
        try {
            await this.prisma.team.delete({
                where: {
                    id,
                },
            });
            return;
        }
        catch (error) {
            this.logger.error('Erro ao deletar o colaborador ', {
                error,
                operation: 'DELETE',
                entity: 'TeamMemberEntity',
            });
            throw new common_1.InternalServerErrorException(`Não foi possível deletar  o o colaborador . Tente novamente.`);
        }
    }
};
exports.TeamRepo = TeamRepo;
exports.TeamRepo = TeamRepo = TeamRepo_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], TeamRepo);
//# sourceMappingURL=team-repo.js.map