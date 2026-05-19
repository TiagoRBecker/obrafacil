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
var SignInUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_repository_interface_1 = require("../repo/user.repository.interface");
const compare_hash_usecase_1 = require("../../security/usecase/compare-hash.usecase");
const generate_access_token_usecase_1 = require("../../security/usecase/generate-access-token.usecase");
const generate_refresh_token_usecase_1 = require("../../security/usecase/generate-refresh-token.usecase");
let SignInUseCase = SignInUseCase_1 = class SignInUseCase {
    constructor(userRepository, compareHashUseCase, generateAccessTokenUseCase, generateRefreshTokenUseCase) {
        this.userRepository = userRepository;
        this.compareHashUseCase = compareHashUseCase;
        this.generateAccessTokenUseCase = generateAccessTokenUseCase;
        this.generateRefreshTokenUseCase = generateRefreshTokenUseCase;
        this.logger = new common_1.Logger(SignInUseCase_1.name);
    }
    async execute(input) {
        this.logger.log(`Tentativa de login para email: ${input.email}`);
        const user = await this.userRepository.findByEmail(input.email);
        if (!user?.email) {
            this.logger.error(`Usuário não encontrado - email: ${input.email}`);
            throw new common_1.UnauthorizedException('Email ou senha inválidas.');
        }
        const { matches } = await this.compareHashUseCase.execute({
            value: input.password,
            hash: user?.passwordHash,
        });
        if (!matches) {
            this.logger.error(`Falha na autenticação - senha incorreta para usuário: ${input.email}`);
            throw new common_1.UnauthorizedException('Email ou senha inválidas.');
        }
        const { accessToken } = this.generateAccessTokenUseCase.execute({
            id: user?.id,
            name: user?.name,
            role: user.role,
            settingsId: user.settingsId,
        });
        const { refreshToken } = this.generateRefreshTokenUseCase.execute({
            id: user.id,
            name: user.name,
            role: user.role,
        });
        this.logger.log(`Login bem-sucedido - usuário: ${user.email}`);
        return {
            accessToken,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                seettingsId: user.settingsId,
                seettings: {
                    id: user?.settingsID,
                    name: user.settingsName,
                    logoUrl: user.settingslogoUrl,
                    specialty: user.settingsspecialty,
                },
            },
        };
    }
};
exports.SignInUseCase = SignInUseCase;
exports.SignInUseCase = SignInUseCase = SignInUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_interface_1.UserRepositoryInterface,
        compare_hash_usecase_1.CompareHashUseCase,
        generate_access_token_usecase_1.GenerateAccessTokenUseCase,
        generate_refresh_token_usecase_1.GenerateRefreshTokenUseCase])
], SignInUseCase);
//# sourceMappingURL=sign-in.usecase.js.map