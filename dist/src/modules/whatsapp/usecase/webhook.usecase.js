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
var WebHookUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebHookUseCase = void 0;
const common_1 = require("@nestjs/common");
const update_status_order_usecase_1 = require("../../budgets/usecase/update-status-order.usecase");
let WebHookUseCase = WebHookUseCase_1 = class WebHookUseCase {
    constructor(updateOrder) {
        this.updateOrder = updateOrder;
        this.logger = new common_1.Logger(WebHookUseCase_1.name);
    }
    async execute(input) {
        try {
            this.logger.log(`Recebido webhook - evento: ${input.event}, keyId: ${input.data.keyId}, status: ${input.data.status}`);
            if (input.event === 'messages.update') {
                await this.updateOrder.execute(input.data.keyId, input.data.status);
                this.logger.log(`Status do orçamento atualizado para: ${input.data.status}`);
            }
            return;
        }
        catch (error) {
            this.logger.error(`Erro ao processar webhook: ${error.message || error}`);
        }
    }
};
exports.WebHookUseCase = WebHookUseCase;
exports.WebHookUseCase = WebHookUseCase = WebHookUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [update_status_order_usecase_1.UpdateOrderStatusUseCase])
], WebHookUseCase);
//# sourceMappingURL=webhook.usecase.js.map