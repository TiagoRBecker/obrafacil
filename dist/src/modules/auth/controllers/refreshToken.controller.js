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
exports.RefreshTokenController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const refresh_token_usecase_1 = require("../usecase/refresh-token.usecase");
const access_token_response_dto_1 = require("../../security/dto/access-token-response.dto");
let RefreshTokenController = class RefreshTokenController {
    constructor(refreshTokenUseCase) {
        this.refreshTokenUseCase = refreshTokenUseCase;
    }
    refreshToken(body) {
        return this.refreshTokenUseCase.execute(body);
    }
};
exports.RefreshTokenController = RefreshTokenController;
__decorate([
    (0, common_1.Post)('refreshtoken'),
    (0, swagger_1.ApiOperation)({
        summary: 'Renovar token de acesso',
        description: 'Utiliza o refresh token para obter um novo access token JWT. O refresh token é obtido no endpoint de login.',
    }),
    (0, swagger_1.ApiBody)({ schema: { type: 'object', properties: { refreshToken: { type: 'string', description: 'Refresh token recebido no login' } } } }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Novo access token gerado com sucesso.', type: access_token_response_dto_1.AccessTokenResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Refresh token inválido ou expirado.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", access_token_response_dto_1.AccessTokenResponseDto)
], RefreshTokenController.prototype, "refreshToken", null);
exports.RefreshTokenController = RefreshTokenController = __decorate([
    (0, swagger_1.ApiTags)('Autenticação'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [refresh_token_usecase_1.RefreshTokenUseCase])
], RefreshTokenController);
//# sourceMappingURL=refreshToken.controller.js.map