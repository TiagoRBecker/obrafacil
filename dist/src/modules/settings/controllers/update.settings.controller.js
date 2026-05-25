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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const settings_id_param_dto_1 = require("../dto/settings-id-param.dto");
const upsert_settings_dto_1 = require("../dto/upsert-settings.dto");
const update_settings_usecase_1 = require("../usecase/update-settings.usecase");
let UpdateSettingsController = class UpdateSettingsController {
    constructor(updateSettingsUseCase) {
        this.updateSettingsUseCase = updateSettingsUseCase;
    }
    update(params, body) {
        return this.updateSettingsUseCase.execute(params.id, body);
    }
};
exports.UpdateSettingsController = UpdateSettingsController;
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Atualizar configurações da empresa',
        description: 'Atualiza as configurações da empresa pelo ID da configuração.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID único da configuração', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiBody)({ type: upsert_settings_dto_1.UpsertSettingsDto, description: 'Dados atualizados da configuração' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Configurações atualizadas com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Configuração não encontrada.' }),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_id_param_dto_1.SettingsIdParamDto,
        upsert_settings_dto_1.UpsertSettingsDto]),
    __metadata("design:returntype", Promise)
], UpdateSettingsController.prototype, "update", null);
exports.UpdateSettingsController = UpdateSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Configurações'),
    (0, common_1.Controller)('admin/settings'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    __metadata("design:paramtypes", [update_settings_usecase_1.UpdateSettingsUseCase])
], UpdateSettingsController);
//# sourceMappingURL=update.settings.controller.js.map