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
var UpdateTeamMemberUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTeamMemberUseCase = void 0;
const common_1 = require("@nestjs/common");
const team_member_repository_1 = require("../repo/team-member.repository");
const team_member_mapper_1 = require("./team-member.mapper");
const team_member_entity_1 = require("../entity/team-member.entity");
let UpdateTeamMemberUseCase = UpdateTeamMemberUseCase_1 = class UpdateTeamMemberUseCase {
    constructor(teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
        this.logger = new common_1.Logger(UpdateTeamMemberUseCase_1.name);
    }
    async execute(id, input) {
        this.logger.log(`Iniciando atualização de membro da equipe - ID: ${id}`);
        const existingMember = await this.teamMemberRepository.findById(id);
        if (!existingMember?.data.id) {
            this.logger.error(`Membro da equipe não encontrado - ID: ${id}`);
            throw new common_1.NotFoundException('Team member not found.');
        }
        this.logger.log(`Atualizando membro da equipe - nome: ${input.name}`);
        const update = team_member_entity_1.TeamMemberEntity.create({
            email: input.email,
            jobTitle: input.jobTitle,
            phone: input.phone,
            name: input.name,
        });
        const savedMember = await this.teamMemberRepository.update(existingMember.data.id, update);
        this.logger.log(`Membro da equipe atualizado com sucesso - ID: ${id}`);
        return team_member_mapper_1.TeamMemberMapper.toResponse(savedMember);
    }
};
exports.UpdateTeamMemberUseCase = UpdateTeamMemberUseCase;
exports.UpdateTeamMemberUseCase = UpdateTeamMemberUseCase = UpdateTeamMemberUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_member_repository_1.TeamMemberRepositoryInterface])
], UpdateTeamMemberUseCase);
//# sourceMappingURL=update-team-member.usecase.js.map