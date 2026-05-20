"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const security_module_1 = require("../security/security.module");
const auth_controller_1 = require("./auth.controller");
const refresh_token_usecase_1 = require("./usecase/refresh-token.usecase");
const sign_in_usecase_1 = require("./usecase/sign-in.usecase");
const sign_up_usecase_1 = require("./usecase/sign-up.usecase");
const prisma_1 = require("../../db/prisma");
const user_module_1 = require("../Users/user.module");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [security_module_1.SecurityModule, user_module_1.UserModule],
        controllers: [auth_controller_1.AuthController],
        providers: [
            prisma_1.PrismaService,
            sign_up_usecase_1.SignUpUseCase,
            sign_in_usecase_1.SignInUseCase,
            refresh_token_usecase_1.RefreshTokenUseCase,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map