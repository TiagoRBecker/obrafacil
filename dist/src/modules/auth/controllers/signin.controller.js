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
exports.SignInController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sign_in_dto_1 = require("../../users/dto/sign-in.dto");
const auth_response_dto_1 = require("../../users/dto/auth-response.dto");
const sign_in_usecase_1 = require("../usecase/sign-in.usecase");
let SignInController = class SignInController {
    constructor(signInUseCase) {
        this.signInUseCase = signInUseCase;
    }
    signIn(body) {
        return this.signInUseCase.execute(body);
    }
};
exports.SignInController = SignInController;
__decorate([
    (0, common_1.Post)('signin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Autenticar usuário',
        description: 'Realiza o login com email e senha. Retorna um token de acesso JWT e refresh token para acessar os demais endpoints protegidos.',
    }),
    (0, swagger_1.ApiBody)({ type: sign_in_dto_1.SignInDto, description: 'Credenciais do usuário (email e senha)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Login realizado com sucesso. Retorna tokens de acesso e dados do usuário.', type: auth_response_dto_1.AuthResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Email ou senha inválidos.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], SignInController.prototype, "signIn", null);
exports.SignInController = SignInController = __decorate([
    (0, swagger_1.ApiTags)('Autenticação'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [sign_in_usecase_1.SignInUseCase])
], SignInController);
//# sourceMappingURL=signin.controller.js.map