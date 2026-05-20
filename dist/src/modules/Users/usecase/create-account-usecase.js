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
var CreateAccountUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entity/user.entity");
const user_repository_interface_1 = require("../repo/user.repository.interface");
const generate_hash_usecase_1 = require("../../security/usecase/generate-hash.usecase");
let CreateAccountUseCase = CreateAccountUseCase_1 = class CreateAccountUseCase {
    constructor(userRepository, generateHashUseCase) {
        this.userRepository = userRepository;
        this.generateHashUseCase = generateHashUseCase;
        this.logger = new common_1.Logger(CreateAccountUseCase_1.name);
    }
    async execute(input) {
        this.logger.log(`Iniciando cadastro de novo usuário - email: ${input.email}`);
        const existingUser = await this.userRepository.findByEmail(input.email);
        if (existingUser?.email) {
            this.logger.error(`Email já cadastrado no sistema: ${input.email}`);
            throw new common_1.BadRequestException('Email is already in use.');
        }
        this.logger.log(`Gerando hash da senha para: ${input.email}`);
        const passwordHash = await this.generateHashUseCase.execute({
            value: input.password,
        });
        const user = user_entity_1.UserEntity.create({
            name: input.name,
            email: input.email,
            role: input.role,
            passwordHash,
        });
        const createdUser = await this.userRepository.create(user);
        this.logger.log(`Usuário cadastrado com sucesso - email: ${createdUser.email}, id: ${createdUser.id}`);
        return {
            user: {
                id: createdUser.id,
                name: createdUser.name,
                email: createdUser.email,
                role: createdUser.role,
                permission: createdUser.permission,
            },
        };
    }
};
exports.CreateAccountUseCase = CreateAccountUseCase;
exports.CreateAccountUseCase = CreateAccountUseCase = CreateAccountUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_interface_1.UserRepositoryInterface,
        generate_hash_usecase_1.GenerateHashUseCase])
], CreateAccountUseCase);
//# sourceMappingURL=create-account-usecase.js.map