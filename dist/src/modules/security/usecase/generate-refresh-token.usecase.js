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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateRefreshTokenUseCase = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let GenerateRefreshTokenUseCase = class GenerateRefreshTokenUseCase {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    execute(input) {
        const payload = {
            id: input.id,
            name: input.name,
            role: input.role,
        };
        const securityConfig = this.configService.get('security');
        const secret = input.secret ?? securityConfig?.jwtRefreshSecret ?? 'change-me-in-production';
        const expiresIn = input.expiresIn ?? securityConfig?.jwtRefreshExpiresIn ?? '15d';
        const refreshToken = this.jwtService.sign(payload, {
            secret,
            expiresIn: expiresIn,
        });
        return {
            refreshToken,
        };
    }
};
exports.GenerateRefreshTokenUseCase = GenerateRefreshTokenUseCase;
exports.GenerateRefreshTokenUseCase = GenerateRefreshTokenUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], GenerateRefreshTokenUseCase);
//# sourceMappingURL=generate-refresh-token.usecase.js.map