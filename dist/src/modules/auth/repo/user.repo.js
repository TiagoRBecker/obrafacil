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
var UserRepo_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const common_1 = require("@nestjs/common");
const prisma_1 = require("../../../db/prisma");
const user_repository_interface_1 = require("./user.repository.interface");
const mapper_user_repo_1 = require("./mapper.user.repo");
let UserRepo = UserRepo_1 = class UserRepo extends user_repository_interface_1.UserRepositoryInterface {
    constructor(prisma) {
        super();
        this.prisma = prisma;
        this.logger = new common_1.Logger(UserRepo_1.name);
    }
    async create(user) {
        const { email, name, passwordHash, role } = user;
        try {
            const user = await this.prisma.account.create({
                data: {
                    email,
                    name,
                    password: passwordHash,
                    role: {
                        connect: {
                            name: role,
                        },
                    },
                },
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                    settings: {
                        select: {
                            id: true,
                            businessName: true,
                            logoUrl: true,
                            specialty: true,
                        },
                    },
                },
            });
            const data = mapper_user_repo_1.MapperToPrisma.toDto(user);
            return data;
        }
        catch (error) {
            this.logger.error('Erro ao criar usuario no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async findByEmail(email) {
        try {
            const user = await this.prisma.account.findUnique({
                where: { email },
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    }
                },
            });
            const data = mapper_user_repo_1.MapperToPrisma.toDto(user);
            return data;
        }
        catch (error) {
            this.logger.error('Erro ao buscar usuario  no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async findById(id) {
        try {
            const user = await this.prisma.account.findUnique({
                where: { id },
                include: {
                    role: {
                        include: {
                            permissions: {
                                include: {
                                    permission: true,
                                },
                            },
                        },
                    },
                },
            });
            const data = mapper_user_repo_1.MapperToPrisma.toDto(user);
            return data;
        }
        catch (error) {
            this.logger.error('Erro ao buscar usuario  no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
    async insertSettingsUser(settingsId, userId) {
        try {
            const user = await this.prisma.account.update({
                where: { id: userId },
                data: {
                    settingsId,
                },
            });
            return;
        }
        catch (error) {
            this.logger.error('Erro ao criar usuario no banco', error);
            throw new common_1.InternalServerErrorException('Erro de persistência no banco de dados');
        }
    }
};
exports.UserRepo = UserRepo;
exports.UserRepo = UserRepo = UserRepo_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], UserRepo);
//# sourceMappingURL=user.repo.js.map