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
var SendMessageUseCase_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageUseCase = void 0;
const common_1 = require("@nestjs/common");
const budget_repository_interface_1 = require("../../budgets/repo/budget.repository.interface");
const evo_api_client_1 = require("../../evo/infra/evo-api.client");
const generateOrderPdf_1 = require("../service/generateOrderPdf");
const whatsapp_repo_interface_1 = require("../repo/whatsapp-repo-interface");
let SendMessageUseCase = SendMessageUseCase_1 = class SendMessageUseCase {
    constructor(whatsappRepo, orderRepo, evoClient) {
        this.whatsappRepo = whatsappRepo;
        this.orderRepo = orderRepo;
        this.evoClient = evoClient;
        this.logger = new common_1.Logger(SendMessageUseCase_1.name);
    }
    async execute(orderId, userId) {
        const session = await this.whatsappRepo.findByFirstSession();
        if (!session?.props)
            throw new common_1.NotFoundException(`Instancia não encontrada , por favor  crie  sua conexao na aba configuracoes!`);
        const key = await this.orderRepo.findMessageTracking(orderId);
        if (key?.orderId)
            throw new common_1.ConflictException(`Ordem de serviço já foi enviada para o cliente. Aguarde atualização do status.`);
        this.logger.log(`Iniciando envio de orçamento - ID: ${orderId}`);
        const existOrderId = await this.orderRepo.findById(orderId);
        if (!existOrderId) {
            this.logger.error(`Orçamento não encontrado - ID: ${orderId}`);
            throw new common_1.NotFoundException(`Orçamento não encontrado na base de dados`);
        }
        this.logger.log(`Gerando PDF do orçamento - Cliente: ${existOrderId.name}`);
        const mapper = this.mapperObject(existOrderId);
        const pdfBuffer = await (0, generateOrderPdf_1.generateOrderPdf)(mapper);
        const pdfBase64 = pdfBuffer?.toString('base64');
        this.logger.log(`Enviando mídia via WhatsApp para: ${mapper.phone}`);
        const data = await this.evoClient.sendMedia(`55${mapper.phone}`, pdfBase64, `orcamento-${mapper.name}.pdf`, `Olá ${mapper.name}!
Preparamos seu orçamento com todos os detalhes.  
Você pode visualizar no PDF em anexo.

Se tiver qualquer dúvida, estou à disposição!`, session?.props.instance);
        console.log(data, "Data  do send essage ev api");
        await this.orderRepo.createTrackingMessage(data.key.id, existOrderId.id);
        this.logger.log(`Criando tracking para mensagem - KeyID: ${data.key.id}`);
        return;
    }
    mapperObject(order) {
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
            materials: order.materials.map((m) => ({
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
    formatDate(date) {
        return new Date(date).toLocaleDateString('pt-BR');
    }
    formatCurrency(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
};
exports.SendMessageUseCase = SendMessageUseCase;
exports.SendMessageUseCase = SendMessageUseCase = SendMessageUseCase_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [whatsapp_repo_interface_1.WhatsAppRepositoryInterface,
        budget_repository_interface_1.BudgetRepositoryInterface,
        evo_api_client_1.EvoApiClient])
], SendMessageUseCase);
//# sourceMappingURL=send-message.usecase.js.map