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
exports.Webhook = exports.MessageController = exports.ConnectionController = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const decorators_1 = require("../../../../decorators");
const connection_service_1 = require("../usecase/connection.service");
const update_status_webhook_service_1 = require("../usecase/update.status.webhook.service");
let ConnectionController = class ConnectionController {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    create(req, body) {
        const userId = req.user;
        return this.connectionService.execute();
    }
    connect(instanceName) {
        return { message: 'Gerar QR Code', instanceName };
    }
    connectionState(instanceName) {
        return { message: 'Status conexão', instanceName };
    }
};
exports.ConnectionController = ConnectionController;
__decorate([
    (0, decorators_1.RequirePermissions)('settings:create'),
    (0, common_1.Get)('connection'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "create", null);
__decorate([
    (0, decorators_1.RequirePermissions)('settings:read'),
    (0, common_1.Get)('connect/:instanceName'),
    __param(0, (0, common_1.Param)('instanceName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "connect", null);
__decorate([
    (0, decorators_1.RequirePermissions)('settings:read'),
    (0, common_1.Get)('connectionState/:instanceName'),
    __param(0, (0, common_1.Param)('instanceName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConnectionController.prototype, "connectionState", null);
exports.ConnectionController = ConnectionController = __decorate([
    (0, common_1.Controller)('instance'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    __metadata("design:paramtypes", [connection_service_1.ConnectionUSeCase])
], ConnectionController);
let MessageController = class MessageController {
    sendMedia(instanceName, body) {
        return {
            message: 'Enviar orçamento',
            instanceName,
            mediaUrl: body.mediaUrl,
            caption: body.caption,
        };
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, decorators_1.RequirePermissions)('settings:create'),
    (0, common_1.Post)('sendMedia/:instanceName'),
    __param(0, (0, common_1.Param)('instanceName')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MessageController.prototype, "sendMedia", null);
exports.MessageController = MessageController = __decorate([
    (0, common_1.Controller)('message'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard)
], MessageController);
let Webhook = class Webhook {
    constructor(updateEvents) {
        this.updateEvents = updateEvents;
    }
    sendMedia(body) {
        return this.updateEvents.execute(body);
    }
};
exports.Webhook = Webhook;
__decorate([
    (0, common_1.Post)('/message/connection-update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], Webhook.prototype, "sendMedia", null);
exports.Webhook = Webhook = __decorate([
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [update_status_webhook_service_1.WebHookUseCase])
], Webhook);
//# sourceMappingURL=connection.controller.js.map