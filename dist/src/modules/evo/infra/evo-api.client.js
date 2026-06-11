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
var EvoApiClient_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvoApiClient = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let EvoApiClient = EvoApiClient_1 = class EvoApiClient {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(EvoApiClient_1.name);
    }
    get baseUrl() {
        return this.configService.get('evo.baseUrl');
    }
    get headers() {
        return {
            apikey: this.configService.get('evo.apiKey'),
            'Content-Type': 'application/json',
        };
    }
    get instanceName() {
        return this.configService.get('evo.instanceName');
    }
    get webhookUrl() {
        return this.configService.get('evo.webhook');
    }
    async connect(instanceName) {
        this.logger.log(`Iniciando conexão com instância: ${instanceName}`);
        const res = await fetch(`${this.baseUrl}/instance/connect/${instanceName}`, {
            method: 'GET',
            headers: this.headers,
        });
        if (!res.ok) {
            this.logger.error(`Falha ao conectar o numero na APi: ${res.status}`);
            throw new common_1.BadRequestException('Erro ao conectar na  API');
        }
        const data = await res.json();
        this.logger.log(`Conexão com Evo API estabelecida com sucesso`);
        return data;
    }
    async create(instanceName) {
        const res = await fetch(`${this.baseUrl}/instance/create`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                instanceName: instanceName,
                token: instanceName,
                integration: 'WHATSAPP-BAILEYS',
                qrcode: false,
                settings: {
                    groupsIgnore: true,
                    alwaysOnline: false,
                    readMessages: false,
                    readStatus: false,
                },
                webhook: {
                    enabled: true,
                    url: this.webhookUrl,
                    byEvents: false,
                    base64: false,
                    headers: {
                        'x-webhook-secret': this.configService.get('evo.apiKey'),
                    },
                    events: ['QRCODE_UPDATED', 'CONNECTION_UPDATE', 'MESSAGES_UPSERT', 'MESSAGES_UPDATE'],
                },
            }),
        });
        if (!res.ok) {
            this.logger.error(`Falha ao conectar na Evo API - status: ${res.status}`);
            throw new common_1.BadRequestException('Erro ao conectar na Evo API');
        }
        const data = await res.json();
        this.logger.log(`Instancia criada com sucesso`);
        return data;
    }
    async getInstance() {
        this.logger.log(`Verificando  a instancia se ja existe: ${this.instanceName}`);
        const res = await fetch(`${this.baseUrl}/instance/fetchInstances`, {
            method: 'GET',
            headers: this.headers,
        });
        if (!res.ok) {
            this.logger.error(`Falha ao conectar na Evo API - status: ${res.status}`);
            throw new common_1.BadRequestException('Erro ao conectar na Evo API');
        }
        const data = await res.json();
        this.logger.log(`Conexão com Evo API estabelecida com sucesso`);
        return data;
    }
    async sendMessage(to, message) {
        this.logger.log(`Enviando mensagem de texto para: ${to}`);
        const payload = {
            number: to,
            text: message,
        };
        const res = await fetch(`${this.baseUrl}/messages/sendText/${this.instanceName}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            this.logger.error(`Falha ao enviar mensagem - status: ${res.status}`);
            throw new common_1.BadRequestException('Erro ao enviar mensagem na Evo API');
        }
        const data = await res.json();
        this.logger.log(`Mensagem enviada com sucesso para: ${to}`);
        return data;
    }
    async sendMedia(to, mediaBase64, fileName, caption, instanceName) {
        this.logger.log(`Enviando mídia para: ${to} - arquivo: ${fileName}`);
        const payload = {
            number: to,
            mediatype: 'document',
            mimetype: 'application/pdf',
            caption: caption || '',
            media: mediaBase64,
            fileName: fileName,
        };
        const res = await fetch(`${this.baseUrl}/message/sendMedia/${instanceName}`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const errorText = await res.text();
            this.logger.error(`Falha ao enviar mídia - erro: ${errorText} - status: ${res.status}`);
            throw new common_1.BadRequestException('Erro ao enviar mídia na Evo API');
        }
        const data = await res.json();
        this.logger.log(`Mídia enviada com sucesso para: ${to}`);
        return data;
    }
};
exports.EvoApiClient = EvoApiClient;
exports.EvoApiClient = EvoApiClient = EvoApiClient_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EvoApiClient);
//# sourceMappingURL=evo-api.client.js.map