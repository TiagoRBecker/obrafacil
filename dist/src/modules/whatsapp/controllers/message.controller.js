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
exports.SendMediaController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_token_guard_1 = require("../../../guards/admin-token.guard");
const decorators_1 = require("../../../../decorators");
let SendMediaController = class SendMediaController {
    sendMedia(instanceName, body) {
        return {
            message: 'Enviar orçamento',
            instanceName,
            mediaUrl: body.mediaUrl,
            caption: body.caption,
        };
    }
};
exports.SendMediaController = SendMediaController;
__decorate([
    (0, decorators_1.RequirePermissions)('settings:create'),
    (0, common_1.Post)('sendMedia/:instanceName'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Enviar mídia via WhatsApp',
        description: 'Envia uma mídia (imagem/documento) via WhatsApp para uma instância específica. Requer permissão `settings:create`.',
    }),
    (0, swagger_1.ApiParam)({ name: 'instanceName', description: 'Nome da instância WhatsApp', example: 'minha-conexao' }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { mediaUrl: { type: 'string', description: 'URL pública da mídia a ser enviada' }, caption: { type: 'string', description: 'Legenda da mídia (opcional)' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Mídia enviada com sucesso.' }),
    __param(0, (0, common_1.Param)('instanceName')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SendMediaController.prototype, "sendMedia", null);
exports.SendMediaController = SendMediaController = __decorate([
    (0, swagger_1.ApiTags)('WhatsApp'),
    (0, common_1.Controller)('message'),
    (0, common_1.UseGuards)(admin_token_guard_1.AdminTokenGuard)
], SendMediaController);
//# sourceMappingURL=message.controller.js.map