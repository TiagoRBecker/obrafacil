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
exports.AdminTokenGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const decorators_1 = require("../../decorators");
const user_repository_interface_1 = require("../modules/users/repo/user.repository.interface");
let AdminTokenGuard = class AdminTokenGuard {
    constructor(jwtService, userRepo, reflector) {
        this.jwtService = jwtService;
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
        const userPermissions = userHavePermission?.permission?.map((rp) => rp.permission.name) ?? [];
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
            const payload = this.jwtService.verify(token);
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
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_repository_interface_1.UserRepositoryInterface,
        core_1.Reflector])
], AdminTokenGuard);
//# sourceMappingURL=admin-token.guard.js.map