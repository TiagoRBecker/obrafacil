import { Injectable, Logger } from '@nestjs/common';
import { BudgetRepositoryInterface } from '../repo/budget.repository.interface';

@Injectable()
export class UpdateOrderStatusUseCase {
  private readonly logger = new Logger(UpdateOrderStatusUseCase.name);

  constructor(private readonly orderRepository: BudgetRepositoryInterface) {}

  async execute(messageId: string, status: string ) {
    if (status !== 'SERVER_ACK') return;

    this.logger.log(`Atualizando status do orçamento - messageId: ${messageId}, status: ${status}`);

    const order = await this.orderRepository.findMessageTracking(messageId);

    if (!order) {
      this.logger.error(`Orçamento não encontrado para messageId: ${messageId}`);
      return;
    }

    await this.orderRepository.updateStatus(order.orderId);
    this.logger.log(`Status do orçamento atualizado com sucesso - orderId: ${order.orderId}`);
  }
}
