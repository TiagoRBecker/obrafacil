"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsModule = void 0;
const common_1 = require("@nestjs/common");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const mock_settings_repository_1 = require("./repo/mock-settings.repository");
const settings_repository_1 = require("./repo/settings.repository");
const settings_controller_1 = require("./settings.controller");
const settings_service_1 = require("./settings.service");
const create_settings_usecase_1 = require("./usecase/create-settings.usecase");
const find_settings_by_id_usecase_1 = require("./usecase/find-settings-by-id.usecase");
const update_settings_usecase_1 = require("./usecase/update-settings.usecase");
const settings_repo_1 = require("./repo/settings-repo");
const prisma_1 = require("../../db/prisma");
const auth_module_1 = require("../auth/auth.module");
const user_repository_interface_1 = require("../auth/repo/user.repository.interface");
const user_repo_1 = require("../auth/repo/user.repo");
let SettingsModule = class SettingsModule {
};
exports.SettingsModule = SettingsModule;
exports.SettingsModule = SettingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [settings_controller_1.SettingsController],
        imports: [auth_module_1.AuthModule],
        providers: [
            settings_service_1.SettingsService,
            create_settings_usecase_1.CreateSettingsUseCase,
            update_settings_usecase_1.UpdateSettingsUseCase,
            find_settings_by_id_usecase_1.FindSettingsByIdUseCase,
            admin_token_guard_1.AdminTokenGuard,
            mock_settings_repository_1.MockSettingsRepository,
            prisma_1.PrismaService,
            {
                provide: settings_repository_1.SettingsRepositoryInterface,
                useClass: settings_repo_1.SettingsRepo,
            },
            {
                provide: user_repository_interface_1.UserRepositoryInterface,
                useClass: user_repo_1.UserRepo,
            },
        ],
    })
], SettingsModule);
//# sourceMappingURL=settings.module.js.map