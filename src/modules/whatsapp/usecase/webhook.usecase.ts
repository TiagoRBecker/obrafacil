import { Inject, Injectable, Logger } from '@nestjs/common';
import { EvoApiClient } from '../../evo/infra/evo-api.client';
import { UpdateOrderStatusUseCase } from '../../budgets/usecase/update-status-order.usecase';

@Injectable()
export class WebHookUseCase {
  private readonly logger = new Logger(WebHookUseCase.name);

  constructor(private readonly updateOrder: UpdateOrderStatusUseCase) {}

  async execute(input: {
    event: string;
    data: {
      keyId: string;
      status: string;
    };
  }): Promise<any> {
    try {
      this.logger.log(`Recebido webhook - evento: ${input.event}, keyId: ${input.data.keyId}, status: ${input.data.status}`);
      
      if (input.event === 'messages.update') {
        await this.updateOrder.execute(input.data.keyId, input.data.status);
        this.logger.log(`Status do orçamento atualizado para: ${input.data.status}`);
      }

      return;
    } catch (error:any) {
      this.logger.error(`Erro ao processar webhook: ${error.message || error}`);
    }
  }
}
