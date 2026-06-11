"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsModule = void 0;
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const get_metrics_usecase_1 = require("./usecase/get-metrics.usecase");
const metrics_repository_interface_1 = require("./repo/metrics-repository.interface");
const metrics_repo_1 = require("./repo/metrics.repo");
const prisma_1 = require("../../db/prisma");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const user_module_1 = require("../users/user.module");
let MetricsModule = class MetricsModule {
};
exports.MetricsModule = MetricsModule;
exports.MetricsModule = MetricsModule = __decorate([
    (0, common_1.Module)({
        controllers: [...controllers_1.MetricsControllers],
        imports: [user_module_1.UserModule],
        providers: [
            get_metrics_usecase_1.GetMetricsUseCase,
            admin_token_guard_1.AdminTokenGuard,
            prisma_1.PrismaService,
            {
                provide: metrics_repository_interface_1.MetricsRepositoryInterface,
                useClass: metrics_repo_1.MetricsRepo,
            },
        ],
    })
], MetricsModule);
//# sourceMappingURL=metrics.module.js.map