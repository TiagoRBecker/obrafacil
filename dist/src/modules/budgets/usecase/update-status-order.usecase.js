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
var UpdateOrderStatusUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderStatusUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_repository_interface_1 = require("../repo/budget.repository.interface");
let UpdateOrderStatusUseCase = UpdateOrderStatusUseCase_1 = class UpdateOrderStatusUseCase {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        this.logger = new common_1.Logger(UpdateOrderStatusUseCase_1.name);
    }
    async execute(messageId, status) {
        if (status !== 'SERVER_ACK')
            return;
        this.logger.log(`Atualizando status do orçamento - messageId: ${messageId}, status: ${status}`);
        const order = await this.orderRepository.findMessageTracking(messageId);
        if (!order) {
            this.logger.error(`Orçamento não encontrado para messageId: ${messageId}`);
            return;
        }
        await this.orderRepository.updateStatus(order.orderId);
        this.logger.log(`Status do orçamento atualizado com sucesso - orderId: ${order.orderId}`);
    }
};
exports.UpdateOrderStatusUseCase = UpdateOrderStatusUseCase;
exports.UpdateOrderStatusUseCase = UpdateOrderStatusUseCase = UpdateOrderStatusUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [budget_repository_interface_1.BudgetRepositoryInterface])
], UpdateOrderStatusUseCase);
//# sourceMappingURL=update-status-order.usecase.js.map