import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BudgetRepositoryInterface } from '../../budgets/repo/budget.repository.interface';

import { EvoApiClient } from '../../evo/infra/evo-api.client';
import { generateOrderPdf } from '../service/generateOrderPdf';
import { WhatsAppRepositoryInterface } from '../repo/whatsapp-repo-interface';

@Injectable()
export class SendMessageUseCase {
  private readonly logger = new Logger(SendMessageUseCase.name);

  constructor(
    private readonly whatsappRepo: WhatsAppRepositoryInterface,
    private readonly orderRepo: BudgetRepositoryInterface,
    private readonly evoClient: EvoApiClient,
  ) {}

  async execute(orderId: string, userId: string): Promise<void> {
    const session = await this.whatsappRepo.findByFirstSession();
    if (!session?.props)
      throw new NotFoundException(
        `Instancia não encontrada , por favor  crie  sua conexao na aba configuracoes!`,
      );
    const key = await this.orderRepo.findMessageTracking(orderId);
    if (key?.orderId)
      throw new ConflictException(
        `Ordem de serviço já foi enviada para o cliente. Aguarde atualização do status.`,
      );

    this.logger.log(`Iniciando envio de orçamento - ID: ${orderId}`);
    const existOrderId = await this.orderRepo.findById(orderId);
    if (!existOrderId) {
      this.logger.error(`Orçamento não encontrado - ID: ${orderId}`);
      throw new NotFoundException(`Orçamento não encontrado na base de dados`);
    }

    this.logger.log(`Gerando PDF do orçamento - Cliente: ${existOrderId.name}`);
    const mapper = this.mapperObject(existOrderId);
    const pdfBuffer = await generateOrderPdf(mapper);
    const pdfBase64 = pdfBuffer?.toString('base64') as string;

    this.logger.log(`Enviando mídia via WhatsApp para: ${mapper.phone}`);
    const data = await this.evoClient.sendMedia(
      `55${mapper.phone}`,
      pdfBase64,
      `orcamento-${mapper.name}.pdf`,
      `Olá ${mapper.name}!
Preparamos seu orçamento com todos os detalhes.  
Você pode visualizar no PDF em anexo.

Se tiver qualquer dúvida, estou à disposição!`,
      session?.props.instance,
    );
    console.log(data, "Data  do send essage ev api")
    await this.orderRepo.createTrackingMessage(data.key.id, existOrderId.id);
    this.logger.log(`Criando tracking para mensagem - KeyID: ${data.key.id}`);
    return;
  }

  private mapperObject(order) {
    return {
      id: order.id,
      createdAt: this.formatDate(order.createdAt),
      name: order.name,
      phone: order.phone,
      address: order.address,
      title: order.title,
      description: order.description,
      initDate: this.formatDate(order.initDate),
      endDate: this.formatDate(order.endDate),
      validityDate: this.formatDate(order.validityDate),
      materials: order.materials.map((m: any) => ({
        name: m.name,
        quantity: m.quantity,
        unitValue: this.formatCurrency(m.unitPrice),
        total: this.formatCurrency(m.unitPrice * m.quantity),
      })),
      laborValue: this.formatCurrency(order.laborValue),
      materialValue: this.formatCurrency(order.materialValue),
      discount: this.formatCurrency(order.discount),
      totalValue: this.formatCurrency(order.totalValue),
      observations: order.observations,
    };
  }

  private formatDate(date: Date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  private formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}
