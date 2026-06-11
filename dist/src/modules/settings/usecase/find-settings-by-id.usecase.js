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
var FindSettingsByIdUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindSettingsByIdUseCase = void 0;
const common_1 = require("@nestjs/common");
const settings_repository_1 = require("../repo/settings.repository");
const settings_mapper_1 = require("./settings.mapper");
let FindSettingsByIdUseCase = FindSettingsByIdUseCase_1 = class FindSettingsByIdUseCase {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
        this.logger = new common_1.Logger(FindSettingsByIdUseCase_1.name);
    }
    async execute() {
        this.logger.log(`Buscando configurações para usuário `);
        const settings = await this.settingsRepository.findByfirst();
        if (!settings) {
            this.logger.error(`Configurações não encontradas - userId: }`);
            throw new common_1.NotFoundException(`Nenhuma configuraçao encontra`);
        }
        this.logger.log(`Configurações encontradas com sucesso `);
        const data = settings_mapper_1.SettingsMapper.toResponse(settings);
        return data;
    }
};
exports.FindSettingsByIdUseCase = FindSettingsByIdUseCase;
exports.FindSettingsByIdUseCase = FindSettingsByIdUseCase = FindSettingsByIdUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [settings_repository_1.SettingsRepositoryInterface])
], FindSettingsByIdUseCase);
//# sourceMappingURL=find-settings-by-id.usecase.js.map