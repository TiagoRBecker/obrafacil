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
var UpsertSettingsUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpsertSettingsUseCase = void 0;
const node_crypto_1 = require("node:crypto");
const common_1 = require("@nestjs/common");
const settings_entity_1 = require("../entity/settings.entity");
const settings_repository_1 = require("../repo/settings.repository");
const settings_mapper_1 = require("./settings.mapper");
const prisma_1 = require("../../../db/prisma");
let UpsertSettingsUseCase = UpsertSettingsUseCase_1 = class UpsertSettingsUseCase {
    constructor(settingsRepository, prisma) {
        this.settingsRepository = settingsRepository;
        this.prisma = prisma;
        this.logger = new common_1.Logger(UpsertSettingsUseCase_1.name);
    }
    async execute(input, userId) {
        this.logger.log(`Upsert de configurações para usuário - userId: ${userId}`);
        const account = await this.prisma.account.findUnique({
            where: { id: userId },
            include: { settings: true },
        });
        if (!account) {
            this.logger.error(`Usuário não encontrado - userId: ${userId}`);
            throw new common_1.UnauthorizedException('Não autorizado');
        }
        const settingsEntity = settings_entity_1.SettingsEntity.create({
            id: account.settingsId ?? (0, node_crypto_1.randomUUID)(),
            name: input.name,
            specialty: input.specialty,
            phone: input.phone,
            email: input.email,
            address: input.address,
            logoUrl: input.logoUrl,
        });
        let savedSettings;
        if (account.settingsId) {
            this.logger.log(`Atualizando configurações existentes - settingsId: ${account.settingsId}`);
            savedSettings = await this.settingsRepository.update(settingsEntity);
        }
        else {
            this.logger.log(`Criando novas configurações para usuário - userId: ${userId}`);
            savedSettings = await this.settingsRepository.create(settingsEntity, userId);
        }
        this.logger.log(`Configurações salvas com sucesso - ID: ${savedSettings.id}`);
        return settings_mapper_1.SettingsMapper.toResponse(savedSettings);
    }
};
exports.UpsertSettingsUseCase = UpsertSettingsUseCase;
exports.UpsertSettingsUseCase = UpsertSettingsUseCase = UpsertSettingsUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_repository_1.SettingsRepositoryInterface,
        prisma_1.PrismaService])
], UpsertSettingsUseCase);
//# sourceMappingURL=upsert-settings.usecase.js.map