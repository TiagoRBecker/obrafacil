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
var FindAllTeamMembersUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllTeamMembersUseCase = void 0;
const common_1 = require("@nestjs/common");
const team_member_repository_1 = require("../repo/team-member.repository");
const team_member_mapper_1 = require("./team-member.mapper");
let FindAllTeamMembersUseCase = FindAllTeamMembersUseCase_1 = class FindAllTeamMembersUseCase {
    constructor(teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
        this.logger = new common_1.Logger(FindAllTeamMembersUseCase_1.name);
    }
    async execute() {
        this.logger.log('Buscando todos os membros da equipe');
        const members = await this.teamMemberRepository.findAll();
        this.logger.log(`Encontrados ${members.length} membros da equipe`);
        return members.map(team_member_mapper_1.TeamMemberMapper.toResponse);
    }
};
exports.FindAllTeamMembersUseCase = FindAllTeamMembersUseCase;
exports.FindAllTeamMembersUseCase = FindAllTeamMembersUseCase = FindAllTeamMembersUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_member_repository_1.TeamMemberRepositoryInterface])
], FindAllTeamMembersUseCase);
//# sourceMappingURL=find-all-team-members.usecase.js.map