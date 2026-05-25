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
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const event_dispatcher_usecase_1 = require("../usecase/event-dispatcher.usecase");
const webhook_guard_1 = require("../../../guards/webhook.guard");
let WebhookController = class WebhookController {
    constructor(eventWebhook) {
        this.eventWebhook = eventWebhook;
    }
    sendMedia(body) {
        return this.eventWebhook.execute(body);
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Post)('/message/connection-update'),
    (0, common_1.UseGuards)(webhook_guard_1.WebhookGuard),
    (0, swagger_1.ApiSecurity)('webhook-secret'),
    (0, swagger_1.ApiOperation)({
        summary: 'Receber atualizações de conexão WhatsApp',
        description: 'Webhook para receber eventos de atualização de status da conexão WhatsApp (QR code lido, conexão estabelecida, desconectado, etc.). Requer header `x-webhook-secret` para autenticação.',
    }),
    (0, swagger_1.ApiBody)({ description: 'Dados do evento enviado pela Evolution API', schema: { type: 'object' } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Evento processado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Webhook secret inválido.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WebhookController.prototype, "sendMedia", null);
exports.WebhookController = WebhookController = __decorate([
    (0, swagger_1.ApiTags)('Webhook'),
    (0, common_1.Controller)('webhook'),
    __metadata("design:paramtypes", [event_dispatcher_usecase_1.EventDispatcherService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map