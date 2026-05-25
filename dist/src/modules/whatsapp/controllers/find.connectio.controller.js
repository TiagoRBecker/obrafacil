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
exports.GetConnectionWhatsAppController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const findByConnection_usecase_1 = require("../usecase/findByConnection-usecase");
let GetConnectionWhatsAppController = class GetConnectionWhatsAppController {
    constructor(connectionService) {
        this.connectionService = connectionService;
    }
    connection(params) {
        return this.connectionService.execute(params.id);
    }
};
exports.GetConnectionWhatsAppController = GetConnectionWhatsAppController;
__decorate([
    (0, common_1.Get)('/connection/:id/qrcode'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obter QR Code da conexão',
        description: 'Retorna o QR Code para conexão com o WhatsApp de uma instância específica.',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID da instância/conexão WhatsApp', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'QR Code retornado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Conexão não encontrada.' }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GetConnectionWhatsAppController.prototype, "connection", null);
exports.GetConnectionWhatsAppController = GetConnectionWhatsAppController = __decorate([
    (0, swagger_1.ApiTags)('WhatsApp'),
    (0, common_1.Controller)('instance'),
    __metadata("design:paramtypes", [findByConnection_usecase_1.GetConnectionUseCase])
], GetConnectionWhatsAppController);
//# sourceMappingURL=find.connectio.controller.js.map