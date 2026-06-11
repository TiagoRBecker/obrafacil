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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageController = void 0;
const common_1 = require("@nestjs/common");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const decorators_1 = require("../../../../decorators");
const send_message_usecase_1 = require("../usecase/send-message.usecase");
let SendMessageController = class SendMessageController {
    constructor(sendMessage) {
        this.sendMessage = sendMessage;
    }
    create(body, request) {
        return this.sendMessage.execute(body.id, request.user);
    }
};
exports.SendMessageController = SendMessageController;
__decorate([
    (0, decorators_1.RequirePermissions)('order:create'),
    (0, common_1.Post)('send/message'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Enviar orçamento via WhatsApp',
        description: 'Envia um orçamento como mensagem via WhatsApp. Requer permissão `order:create`.',
    }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { id: { type: 'string', description: 'ID do orçamento a ser enviado' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Mensagem enviada com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Token de acesso ausente ou inválido.' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object]),
    __metadata("design:returntype", void 0)
], SendMessageController.prototype, "create", null);
exports.SendMessageController = SendMessageController = __decorate([
    (0, swagger_1.ApiTags)('Mensagens'),
    (0, common_1.Controller)('WhatsApp'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard),
    __metadata("design:paramtypes", [send_message_usecase_1.SendMessageUseCase])
], SendMessageController);
//# sourceMappingURL=message.controller.js.map