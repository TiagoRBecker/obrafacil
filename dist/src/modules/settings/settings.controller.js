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
exports.SettingsController = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const settings_id_param_dto_1 = require("./dto/settings-id-param.dto");
const upsert_settings_dto_1 = require("./dto/upsert-settings.dto");
const settings_service_1 = require("./settings.service");
const decorators_1 = require("../../../decorators");
let SettingsController = class SettingsController {
    constructor(settingsService) {
        this.settingsService = settingsService;
    }
    create(req, body) {
        const userId = req.user;
        return this.settingsService.create(body, userId);
    }
    update(params, body) {
        return this.settingsService.update(params.id, body);
    }
    findById(req) {
        const userId = req.user;
        return this.settingsService.findById(userId);
    }
};
exports.SettingsController = SettingsController;
__decorate([
    (0, decorators_1.RequirePermissions)('order:create'),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upsert_settings_dto_1.UpsertSettingsDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [settings_id_param_dto_1.SettingsIdParamDto,
        upsert_settings_dto_1.UpsertSettingsDto]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "update", null);
__decorate([
    (0, decorators_1.RequirePermissions)('settings:read'),
    (0, common_1.Get)('/me'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SettingsController.prototype, "findById", null);
exports.SettingsController = SettingsController = __decorate([
    (0, common_1.Controller)('admin/settings'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    __metadata("design:paramtypes", [settings_service_1.SettingsService])
], SettingsController);
//# sourceMappingURL=settings.controller.js.map