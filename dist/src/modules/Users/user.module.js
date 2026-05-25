"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const security_module_1 = require("../security/security.module");
const prisma_1 = require("../../db/prisma");
const user_repository_interface_1 = require("./repo/user.repository.interface");
const in_memory_user_repository_1 = require("./repo/in-memory-user.repository");
const user_repo_1 = require("./repo/user.repo");
const create_account_usecase_1 = require("./usecase/create-account-usecase");
const find_user_id_usecase_1 = require("./usecase/find-user-id-usecase");
const shared_module_1 = require("../Shared/shared.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [security_module_1.SecurityModule, shared_module_1.SharedModule],
        providers: [
            {
                provide: user_repository_interface_1.UserRepositoryInterface,
                useClass: user_repo_1.UserRepo,
            },
            prisma_1.PrismaService,
            create_account_usecase_1.CreateAccountUseCase,
            in_memory_user_repository_1.InMemoryUserRepository,
            find_user_id_usecase_1.FindUserByEmailUsecase,
        ],
        exports: [
            user_repository_interface_1.UserRepositoryInterface,
            create_account_usecase_1.CreateAccountUseCase,
            find_user_id_usecase_1.FindUserByEmailUsecase,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map