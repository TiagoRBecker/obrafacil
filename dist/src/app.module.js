"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const budgets_module_1 = require("./modules/budgets/budgets.module");
const customers_module_1 = require("./modules/customers/customers.module");
const security_module_1 = require("./modules/security/security.module");
const settings_module_1 = require("./modules/settings/settings.module");
const team_module_1 = require("./modules/team/team.module");
const prisma_exception_filter_1 = require("./filters/prisma-exception.filter");
const whatsapp_module_1 = require("./modules/whatsapp/whatsapp.module");
const evo_module_1 = require("./modules/evo/evo.module");
const message_module_1 = require("./modules/message/message.module");
const user_module_1 = require("./modules/users/user.module");
const shared_module_1 = require("./modules/Shared/shared.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            jwt_1.JwtModule.registerAsync({
                global: true,
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('security.jwtAccessSecret') ?? 'dev-secret',
                    signOptions: {
                        expiresIn: configService.get('security.jwtAccessExpiresIn') ?? '55m',
                    },
                }),
            }),
            auth_module_1.AuthModule,
            budgets_module_1.BudgetsModule,
            team_module_1.TeamModule,
            customers_module_1.CustomersModule,
            settings_module_1.SettingsModule,
            security_module_1.SecurityModule,
            whatsapp_module_1.WhatsAppModule,
            evo_module_1.EvoModule,
            message_module_1.MessageModule,
            user_module_1.UserModule,
            shared_module_1.SharedModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: prisma_exception_filter_1.PrismaExceptionFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map