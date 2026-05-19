import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BudgetRepositoryInterface } from '../../budgets/repo/budget.repository.interface';
import { generateOrderPdf } from '../service/generateOrderPdf';
import { EvoApiClient } from '../../evo/infra/evo-api.client';

@Injectable()
export class SendMessageUseCase {
  private readonly logger = new Logger(SendMessageUseCase.name);

  constructor(
    private readonly orderRepo: BudgetRepositoryInterface,
    private readonly evoClient: EvoApiClient,
  ) {}

  async execute(orderId: string): Promise<void> {
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
      '5551995204223',
      pdfBase64,
      `orcamento-${mapper.name}.pdf`,
      `Olá ${mapper.name}!
Preparamos seu orçamento com todos os detalhes.  
Você pode visualizar no PDF em anexo.

Se tiver qualquer dúvida, estou à disposição!`,
    );
   
    const key = await this.orderRepo.findMessageTracking(data.key.id);
    
    if (!key) {
      this.logger.log(`Criando tracking para mensagem - KeyID: ${data.key.id}`);
      await this.orderRepo.createTrackingMessage(data.key.id,existOrderId.id);
    } else {
      this.logger.warn(`Mensagem já possui tracking - KeyID: ${data.key.id}`);
    }
    
    this.logger.log(`Orçamento enviado com sucesso - ID: ${orderId}`);
  }

  private mapperObject(order) {
    return {
      companyName: 'Tiago Becker',
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
