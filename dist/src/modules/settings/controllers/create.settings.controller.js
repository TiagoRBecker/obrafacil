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
exports.CreateSettingsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const upsert_settings_dto_1 = require("../dto/upsert-settings.dto");
const create_settings_usecase_1 = require("../usecase/create-settings.usecase");
const decorators_1 = require("../../../../decorators");
let CreateSettingsController = class CreateSettingsController {
    constructor(createSettingsUseCase) {
        this.createSettingsUseCase = createSettingsUseCase;
    }
    create(req, body) {
        const userId = req.user;
        return this.createSettingsUseCase.execute(body, userId);
    }
};
exports.CreateSettingsController = CreateSettingsController;
__decorate([
    (0, decorators_1.RequirePermissions)('order:create'),
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar configurações da empresa',
        description: 'Cria as configurações iniciais da empresa (nome, especialidade, telefone, email, logo). Requer permissão `order:create`.',
    }),
    (0, swagger_1.ApiBody)({ type: upsert_settings_dto_1.UpsertSettingsDto, description: 'Dados de configuração da empresa' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Configurações criadas com sucesso.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_settings_dto_1.UpsertSettingsDto]),
    __metadata("design:returntype", Promise)
], CreateSettingsController.prototype, "create", null);
exports.CreateSettingsController = CreateSettingsController = __decorate([
    (0, swagger_1.ApiTags)('Configurações'),
    (0, common_1.Controller)('admin/settings'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    __metadata("design:paramtypes", [create_settings_usecase_1.CreateSettingsUseCase])
], CreateSettingsController);
//# sourceMappingURL=create.settings.controller.js.map