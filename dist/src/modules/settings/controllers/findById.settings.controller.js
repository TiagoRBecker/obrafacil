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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindByIdSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const find_settings_by_id_usecase_1 = require("../usecase/find-settings-by-id.usecase");
const decorators_1 = require("../../../../decorators");
const types_1 = require("../../../../decorators/types");
let FindByIdSettingsController = class FindByIdSettingsController {
    constructor(findSettingsByIdUseCase) {
        this.findSettingsByIdUseCase = findSettingsByIdUseCase;
    }
    findById() {
        return this.findSettingsByIdUseCase.execute();
    }
};
exports.FindByIdSettingsController = FindByIdSettingsController;
__decorate([
    (0, decorators_1.Roles)(types_1.UserRole.ADMIN, types_1.UserRole.USER),
    (0, decorators_1.RequirePermissions)('settings:read'),
    (0, common_1.Get)('/me'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Buscar configurações da empresa',
        description: 'Retorna as configurações da empresa do usuário logado. Requer permissão `settings:read`.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Configurações encontradas com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Configurações não encontradas para este usuário.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FindByIdSettingsController.prototype, "findById", null);
exports.FindByIdSettingsController = FindByIdSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Configurações'),
    (0, common_1.Controller)('admin/settings'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    __metadata("design:paramtypes", [find_settings_by_id_usecase_1.FindSettingsByIdUseCase])
], FindByIdSettingsController);
//# sourceMappingURL=findById.settings.controller.js.map