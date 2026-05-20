"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt = __importStar(require("jsonwebtoken"));
const core_1 = require("@nestjs/core");
const decorators_1 = require("../../decorators");
const user_repository_interface_1 = require("../modules/Users/repo/user.repository.interface");
let AdminTokenGuard = class AdminTokenGuard {
    constructor(configService, userRepo, reflector) {
        this.configService = configService;
        this.userRepo = userRepo;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.getAllAndOverride(decorators_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        const request = context.switchToHttp().getRequest();
        const token = this.extractBearerToken(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Missing authorization token.');
        }
        const payload = this.decodeTokenPayload(token);
        if (!payload) {
            throw new common_1.UnauthorizedException('Admin access only.');
        }
        const userHavePermission = await this.userRepo.findById(payload.id);
        if (!userHavePermission)
            throw new common_1.UnauthorizedException('Acesso negado ');
        const userPermissions = userHavePermission?.permission?.map((rp) => rp) ?? [];
        const hasAll = requiredPermissions?.every((p) => userPermissions.includes(p));
        if (!hasAll)
            throw new common_1.UnauthorizedException('Acesso somente  para adminstradores ');
        request.user = userHavePermission.id;
        return true;
    }
    extractBearerToken(request) {
        const authorization = request.headers.authorization;
        if (!authorization) {
            return null;
        }
        const [type, token] = authorization.split(' ');
        if (type !== 'Bearer' || !token) {
            return null;
        }
        return token;
    }
    decodeTokenPayload(token) {
        try {
            const secret = this.configService.get('security.jwtAccessSecret') ??
                process.env.JWT_ACCESS_SECRET ??
                'dev-secret';
            const payload = jwt.verify(token, secret);
            if (typeof payload.id !== 'string' ||
                typeof payload.name !== 'string' ||
                typeof payload.role !== 'string') {
                return null;
            }
            return {
                id: payload.id,
                name: payload.name,
                role: payload.role,
                settingsId: payload?.settingsId,
            };
        }
        catch {
            return null;
        }
    }
};
exports.AdminTokenGuard = AdminTokenGuard;
exports.AdminTokenGuard = AdminTokenGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        user_repository_interface_1.UserRepositoryInterface,
        core_1.Reflector])
], AdminTokenGuard);
//# sourceMappingURL=admin-token.guard.js.map