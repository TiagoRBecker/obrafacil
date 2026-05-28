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
exports.RefreshAccessTokenUseCase = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let RefreshAccessTokenUseCase = class RefreshAccessTokenUseCase {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    execute(input) {
        const securityConfig = this.configService.get('security');
        const refreshSecret = input.refreshSecret ?? securityConfig?.jwtRefreshSecret ?? 'dev-refresh-secret';
        const accessExpiresIn = input.accessExpiresIn ?? securityConfig?.jwtAccessExpiresIn ?? '15m';
        let payload;
        try {
            payload = this.jwtService.verify(input.refreshToken, { secret: refreshSecret });
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token.');
        }
        if (!payload?.id || !payload?.name || !payload?.role) {
            throw new common_1.UnauthorizedException('Invalid refresh token payload.');
        }
        const accessToken = this.jwtService.sign({
            id: payload.id,
            name: payload.name,
            role: payload.role,
        }, { expiresIn: accessExpiresIn });
        return {
            accessToken,
        };
    }
};
exports.RefreshAccessTokenUseCase = RefreshAccessTokenUseCase;
exports.RefreshAccessTokenUseCase = RefreshAccessTokenUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], RefreshAccessTokenUseCase);
//# sourceMappingURL=refresh-access-token.usecase.js.map