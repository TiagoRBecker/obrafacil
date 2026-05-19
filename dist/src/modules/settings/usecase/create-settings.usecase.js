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
var CreateSettingsUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettingsUseCase = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const settings_entity_1 = require("../entity/settings.entity");
const settings_repository_1 = require("../repo/settings.repository");
const settings_mapper_1 = require("./settings.mapper");
const user_repository_interface_1 = require("../../auth/repo/user.repository.interface");
let CreateSettingsUseCase = CreateSettingsUseCase_1 = class CreateSettingsUseCase {
    constructor(settingsRepository, userRepo) {
        this.settingsRepository = settingsRepository;
        this.userRepo = userRepo;
        this.logger = new common_1.Logger(CreateSettingsUseCase_1.name);
    }
    async execute(input, userId) {
        this.logger.log(`Iniciando criação de configurações para usuário - userId: ${userId}`);
        const existBussnines = await this.userRepo.findById(userId);
        if (!existBussnines) {
            this.logger.error(`Usuário não autorizado - userId: ${userId}`);
            throw new common_1.UnauthorizedException(`Não autorizado `);
        }
        if (existBussnines.settingsId) {
            this.logger.warn(`Usuário já possui configurações ativas - userId: ${userId}`);
            throw new common_1.ConflictException(`Usuario ja possui  uma configuração ativa`);
        }
        this.logger.log(`Criando configurações - nome: ${input.name}`);
        const settings = settings_entity_1.SettingsEntity.create({
            id: (0, node_crypto_1.randomUUID)(),
            name: input.name,
            specialty: input.specialty,
            phone: input.phone,
            email: input.email,
            address: input.address,
            logoUrl: input.logoUrl,
        });
        const createdSettings = await this.settingsRepository.create(settings);
        this.logger.log(`Configurações criadas com sucesso - ID: ${createdSettings.id}`);
        await this.userRepo.insertSettingsUser(createdSettings.id, userId);
        this.logger.log(`Configurações vinculadas ao usuário - userId: ${userId}, settingsId: ${createdSettings.id}`);
        return settings_mapper_1.SettingsMapper.toResponse(createdSettings);
    }
};
exports.CreateSettingsUseCase = CreateSettingsUseCase;
exports.CreateSettingsUseCase = CreateSettingsUseCase = CreateSettingsUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_repository_1.SettingsRepositoryInterface,
        user_repository_interface_1.UserRepositoryInterface])
], CreateSettingsUseCase);
//# sourceMappingURL=create-settings.usecase.js.map