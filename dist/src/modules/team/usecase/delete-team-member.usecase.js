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
var DeleteTeamMemberUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTeamMemberUseCase = void 0;
const common_1 = require("@nestjs/common");
const team_member_repository_1 = require("../repo/team-member.repository");
let DeleteTeamMemberUseCase = DeleteTeamMemberUseCase_1 = class DeleteTeamMemberUseCase {
    constructor(teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
        this.logger = new common_1.Logger(DeleteTeamMemberUseCase_1.name);
    }
    async execute(id) {
        this.logger.log(`Iniciando exclusão de membro da equipe - ID: ${id}`);
        const existingMember = await this.teamMemberRepository.findById(id);
        if (!existingMember) {
            this.logger.error(`Membro da equipe não encontrado para exclusão - ID: ${id}`);
            throw new common_1.NotFoundException('Team member not found.');
        }
        await this.teamMemberRepository.delete(id);
        this.logger.log(`Membro da equipe excluído com sucesso - ID: ${id}`);
        return {
            id,
            deleted: true,
        };
    }
};
exports.DeleteTeamMemberUseCase = DeleteTeamMemberUseCase;
exports.DeleteTeamMemberUseCase = DeleteTeamMemberUseCase = DeleteTeamMemberUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_member_repository_1.TeamMemberRepositoryInterface])
], DeleteTeamMemberUseCase);
//# sourceMappingURL=delete-team-member.usecase.js.map