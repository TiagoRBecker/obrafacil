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
const common_1 = require("@nestjs/common");
const settings_entity_1 = require("../entity/settings.entity");
const settings_repository_1 = require("../repo/settings.repository");
const settings_mapper_1 = require("./settings.mapper");
let UpsertSettingsUseCase = UpsertSettingsUseCase_1 = class UpsertSettingsUseCase {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
        this.logger = new common_1.Logger(UpsertSettingsUseCase_1.name);
    }
    async execute(input, userId) {
        this.logger.log(`Upsert de configurações para usuário - userId: ${userId}`);
        const settingsEntity = settings_entity_1.SettingsEntity.create({
            id: input.id,
            name: input.name,
            specialty: input.specialty,
            phone: input.phone,
            email: input.email,
            address: input.address,
            logoUrl: input.logoUrl,
        });
        let savedSettings;
        await this.settingsRepository.create(settingsEntity);
        return settings_mapper_1.SettingsMapper.toResponse(settingsEntity);
    }
};
exports.UpsertSettingsUseCase = UpsertSettingsUseCase;
exports.UpsertSettingsUseCase = UpsertSettingsUseCase = UpsertSettingsUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_repository_1.SettingsRepositoryInterface])
], UpsertSettingsUseCase);
//# sourceMappingURL=upsert-settings.usecase.js.map