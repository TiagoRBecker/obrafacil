"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const message_controller_1 = require("./controller/message.controller");
const admin_token_guard_1 = require("../../guards/admin-token.guard");
const send_message_usecase_1 = require("./usecase/send-message.usecase");
const budgets_module_1 = require("../budgets/budgets.module");
const evo_module_1 = require("../evo/evo.module");
const user_module_1 = require("../Users/user.module");
let MessageModule = class MessageModule {
};
exports.MessageModule = MessageModule;
exports.MessageModule = MessageModule = __decorate([
    (0, common_1.Module)({
        controllers: [message_controller_1.SendMessageController],
        imports: [budgets_module_1.BudgetsModule, evo_module_1.EvoModule, user_module_1.UserModule],
        providers: [send_message_usecase_1.SendMessageUseCase, admin_token_guard_1.AdminTokenGuard],
    })
], MessageModule);
//# sourceMappingURL=message.module.js.map