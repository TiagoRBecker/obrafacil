"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const security_config_1 = __importDefault(require("./security.config"));
const compare_hash_usecase_1 = require("./usecase/compare-hash.usecase");
const generate_access_token_usecase_1 = require("./usecase/generate-access-token.usecase");
const generate_hash_usecase_1 = require("./usecase/generate-hash.usecase");
const generate_refresh_token_usecase_1 = require("./usecase/generate-refresh-token.usecase");
const refresh_access_token_usecase_1 = require("./usecase/refresh-access-token.usecase");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forFeature(security_config_1.default),
        ],
        providers: [
            generate_hash_usecase_1.GenerateHashUseCase,
            compare_hash_usecase_1.CompareHashUseCase,
            generate_access_token_usecase_1.GenerateAccessTokenUseCase,
            generate_refresh_token_usecase_1.GenerateRefreshTokenUseCase,
            refresh_access_token_usecase_1.RefreshAccessTokenUseCase,
        ],
        exports: [
            generate_hash_usecase_1.GenerateHashUseCase,
            compare_hash_usecase_1.CompareHashUseCase,
            generate_access_token_usecase_1.GenerateAccessTokenUseCase,
            generate_refresh_token_usecase_1.GenerateRefreshTokenUseCase,
            refresh_access_token_usecase_1.RefreshAccessTokenUseCase,
        ],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map