"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsAppModule = void 0;
const common_1 = require("@nestjs/common");
const controllers_1 = require("./controllers");
const evo_module_1 = require("../evo/evo.module");
const budgets_module_1 = require("../budgets/budgets.module");
const user_module_1 = require("../users/user.module");
const webhook_guard_1 = require("../../guards/webhook.guard");
const webhook_usecase_1 = require("./usecase/webhook.usecase");
const create_connection_instance_usecase_1 = require("./usecase/create-connection-instance.usecase");
const event_dispatcher_usecase_1 = require("./usecase/event-dispatcher.usecase");
const update_status_connection_usecase_1 = require("./usecase/update-status-connection-usecase");
const whatsapp_repo_interface_1 = require("./repo/whatsapp-repo-interface");
const whatsapp_repo_1 = require("./repo/whatsapp-repo");
const prisma_1 = require("../../db/prisma");
const findByConnection_usecase_1 = require("./usecase/findByConnection-usecase");
const send_message_usecase_1 = require("./usecase/send-message.usecase");
let WhatsAppModule = class WhatsAppModule {
};
exports.WhatsAppModule = WhatsAppModule;
exports.WhatsAppModule = WhatsAppModule = __decorate([
    (0, common_1.Module)({
        controllers: [...controllers_1.WhatsAppController],
        imports: [evo_module_1.EvoModule, budgets_module_1.BudgetsModule, user_module_1.UserModule],
        providers: [
            prisma_1.PrismaService,
            create_connection_instance_usecase_1.CreateConnectionUseCase,
            webhook_usecase_1.WebHookUseCase,
            event_dispatcher_usecase_1.EventDispatcherService,
            update_status_connection_usecase_1.UpdateStatusConnectionUseCase,
            findByConnection_usecase_1.GetConnectionUseCase,
            webhook_guard_1.WebhookGuard,
            send_message_usecase_1.SendMessageUseCase,
            {
                provide: whatsapp_repo_interface_1.WhatsAppRepositoryInterface,
                useClass: whatsapp_repo_1.WhatsAppRepo,
            },
        ],
    })
], WhatsAppModule);
//# sourceMappingURL=whatsapp.module.js.map