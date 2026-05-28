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
var FindTeamMemberByIdUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindTeamMemberByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const team_member_repository_1 = require("../repo/team-member.repository");
const team_member_mapper_1 = require("./team-member.mapper");
let FindTeamMemberByIdUseCase = FindTeamMemberByIdUseCase_1 = class FindTeamMemberByIdUseCase {
    constructor(teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
        this.logger = new common_1.Logger(FindTeamMemberByIdUseCase_1.name);
    }
    async execute(id) {
        this.logger.log(`Buscando membro da equipe por ID: ${id}`);
        const member = await this.teamMemberRepository.findById(id);
        if (!member) {
            this.logger.error(`Membro da equipe não encontrado - ID: ${id}`);
            throw new common_1.NotFoundException('Team member not found.');
        }
        this.logger.log(`Membro da equipe encontrado - ID: ${id}, nome: ${member.data.name}`);
        return team_member_mapper_1.TeamMemberMapper.toResponse(member);
    }
};
exports.FindTeamMemberByIdUseCase = FindTeamMemberByIdUseCase;
exports.FindTeamMemberByIdUseCase = FindTeamMemberByIdUseCase = FindTeamMemberByIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_member_repository_1.TeamMemberRepositoryInterface])
], FindTeamMemberByIdUseCase);
//# sourceMappingURL=find-team-member-by-id.usecase.js.map