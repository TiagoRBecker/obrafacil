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
const generate_access_token_usecase_1 = require("../../security/usecase/generate-access-token.usecase");
const generate_refresh_token_usecase_1 = require("../../security/usecase/generate-refresh-token.usecase");
const find_user_id_usecase_1 = require("../../users/usecase/find-user-id-usecase");
let SignInUseCase = SignInUseCase_1 = class SignInUseCase {
    constructor(findByUser, generateAccessTokenUseCase, generateRefreshTokenUseCase) {
        this.findByUser = findByUser;
        this.generateAccessTokenUseCase = generateAccessTokenUseCase;
        this.generateRefreshTokenUseCase = generateRefreshTokenUseCase;
        this.logger = new common_1.Logger(SignInUseCase_1.name);
    }
    async execute(input) {
        this.logger.log(`Tentativa de login para email: ${input.email}`);
        const { user } = await this.findByUser.execute(input);
        const { accessToken } = this.generateAccessTokenUseCase.execute({
            id: user?.id,
            name: user?.name,
            role: user.role,
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
                companyName: user?.name,
                specialty: user?.specialty,
                logoUrl: user?.logoUrl,
            },
        };
    }
};
exports.SignInUseCase = SignInUseCase;
exports.SignInUseCase = SignInUseCase = SignInUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [find_user_id_usecase_1.FindUserByEmailUsecase,
        generate_access_token_usecase_1.GenerateAccessTokenUseCase,
        generate_refresh_token_usecase_1.GenerateRefreshTokenUseCase])
], SignInUseCase);
//# sourceMappingURL=sign-in.usecase.js.map