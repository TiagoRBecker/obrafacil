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
var CreateTeamMemberUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTeamMemberUseCase = void 0;
const common_1 = require("@nestjs/common");
const team_member_entity_1 = require("../entity/team-member.entity");
const team_member_repository_1 = require("../repo/team-member.repository");
const team_member_mapper_1 = require("./team-member.mapper");
let CreateTeamMemberUseCase = CreateTeamMemberUseCase_1 = class CreateTeamMemberUseCase {
    constructor(teamMemberRepository) {
        this.teamMemberRepository = teamMemberRepository;
        this.logger = new common_1.Logger(CreateTeamMemberUseCase_1.name);
    }
    async execute(input) {
        this.logger.log(`Iniciando criação de membro da equipe - email: ${input.email}`);
        const [existingMember, existPhone] = await Promise.all([
            this.teamMemberRepository.findByEmail(input.email),
            this.teamMemberRepository.findByPhone(input.phone),
        ]);
        if (existingMember?.data?.email) {
            this.logger.warn(`Conflito: email já cadastrado - ${input.email}`);
            throw new common_1.ConflictException('Já existe um usuário cadastrado com esse e-mail.');
        }
        if (existPhone?.data?.phone) {
            this.logger.warn(`Conflito: telefone já cadastrado - ${input.phone}`);
            throw new common_1.ConflictException('Já existe um usuário cadastrado com esse telefone.');
        }
        try {
            this.logger.log(`Criando membro da equipe - nome: ${input.name}`);
            const member = team_member_entity_1.TeamMemberEntity.create(input);
            const createdMember = await this.teamMemberRepository.create(member);
            this.logger.log(`Membro da equipe criado com sucesso - ID: ${createdMember.data.id}, nome: ${createdMember.data.name}`);
            return team_member_mapper_1.TeamMemberMapper.toResponse(createdMember);
        }
        catch (error) {
            this.logger.error(`Erro ao criar membro da equipe - email: ${input.email}, erro: ${error.message || error}`);
            throw new common_1.BadRequestException(`Erro ao criar o  novo colaborador `);
        }
    }
};
exports.CreateTeamMemberUseCase = CreateTeamMemberUseCase;
exports.CreateTeamMemberUseCase = CreateTeamMemberUseCase = CreateTeamMemberUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [team_member_repository_1.TeamMemberRepositoryInterface])
], CreateTeamMemberUseCase);
//# sourceMappingURL=create-team-member.usecase.js.map