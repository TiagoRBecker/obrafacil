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
exports.ConnectionWhatsAppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_connection_instance_usecase_1 = require("../usecase/create-connection-instance.usecase");
let ConnectionWhatsAppController = class ConnectionWhatsAppController {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    connection(body) {
        return this.connectionService.execute(body.instanceName);
    }
};
exports.ConnectionWhatsAppController = ConnectionWhatsAppController;
__decorate([
    (0, common_1.Post)('create/connection'),
    (0, swagger_1.ApiOperation)({
        summary: 'Criar conexão WhatsApp',
        description: 'Inicia uma nova conexão com o WhatsApp. Cria uma instância para gerar o QR Code de conexão.',
    }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { instanceName: { type: 'string', description: 'Nome da instância WhatsApp' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Conexão iniciada. QR Code disponível para escaneamento.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ConnectionWhatsAppController.prototype, "connection", null);
exports.ConnectionWhatsAppController = ConnectionWhatsAppController = __decorate([
    (0, swagger_1.ApiTags)('WhatsApp'),
    (0, common_1.Controller)('instance'),
    __metadata("design:paramtypes", [create_connection_instance_usecase_1.CreateConnectionUseCase])
], ConnectionWhatsAppController);
//# sourceMappingURL=connection.controller.js.map