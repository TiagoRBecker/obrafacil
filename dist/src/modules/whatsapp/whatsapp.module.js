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
const connection_controller_1 = require("./controllers/connection.controller");
const evo_module_1 = require("../evo/evo.module");
const connection_service_1 = require("./usecase/connection.service");
const update_status_webhook_service_1 = require("./usecase/update.status.webhook.service");
const budgets_module_1 = require("../budgets/budgets.module");
const user_module_1 = require("../Users/user.module");
let WhatsAppModule = class WhatsAppModule {
};
exports.WhatsAppModule = WhatsAppModule;
exports.WhatsAppModule = WhatsAppModule = __decorate([
    (0, common_1.Module)({
        controllers: [connection_controller_1.ConnectionController, connection_controller_1.MessageController, connection_controller_1.Webhook],
        imports: [evo_module_1.EvoModule, budgets_module_1.BudgetsModule, user_module_1.UserModule],
        providers: [connection_service_1.ConnectionUSeCase, update_status_webhook_service_1.WebHookUseCase],
    })
], WhatsAppModule);
//# sourceMappingURL=whatsapp.module.js.map