import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageService } from '../domain/send-message.service.interface';
import { ConnectionService } from '../domain/connection.service.interface';

@Injectable()
export class EvoApiClient implements ConnectionService, SendMessageService {
  private readonly logger = new Logger(EvoApiClient.name);

  constructor(private configService: ConfigService) {}

  private get baseUrl() {
    return this.configService.get<string>('evo.baseUrl');
  }

  private get headers() {
    return {
      apikey: this.configService.get<string>('evo.apiKey') as string,
      'Content-Type': 'application/json',
    };
  }

  private get instanceName() {
    return this.configService.get<string>('evo.instanceName');
  }
  private get webhookUrl() {
    return this.configService.get<string>('evo.webhook');
  }

  async connect(instanceName: string): Promise<any> {
    this.logger.log(`Iniciando conexão com instância: ${instanceName}`);
    const res = await fetch(
      `${this.baseUrl}/instance/connect/${instanceName}`,
      {
        method: 'GET',
        headers: this.headers,
      },
    );

    if (!res.ok) {
      console.log(res.ok)
      this.logger.error(`Falha ao conectar o numero na APi: ${res.status}`);
      throw new BadRequestException('Erro ao conectar na  API');
    }

    const data = await res.json();
    this.logger.log(`Conexão com Evo API estabelecida com sucesso`);
    return data;
  }
  async create(instanceName: string): Promise<any> {

     
    const res = await fetch(
      `${this.baseUrl}/instance/create`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          instanceName: instanceName,
          token: instanceName,
          integration: 'WHATSAPP-BAILEYS',

          qrcode: false, // 👈 essencial

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

            // 👉 QR já vem pronto em base64
            base64: false,

            headers: {
              'x-webhook-secret': this.configService.get<string>('evo.apiKey') as string,
            },

            events: ['QRCODE_UPDATED', 'CONNECTION_UPDATE', 'MESSAGES_UPSERT'],
          },
        }),
      },
    );

    if (!res.ok) {
      this.logger.error(`Falha ao conectar na Evo API - status: ${res.status}`);
      throw new BadRequestException('Erro ao conectar na Evo API');
    }

    const data = await res.json();
    this.logger.log(`Instancia criada com sucesso`);
    return data;
  }
  async getInstance(): Promise<any> {

    this.logger.log(
      `Verificando  a instancia se ja existe: ${this.instanceName}`,
    );
    const res = await fetch(`${this.baseUrl}/instance/fetchInstances`, {
      method: 'GET',
      headers: this.headers,
    });
    console.log(res)

    if (!res.ok) {
      this.logger.error(`Falha ao conectar na Evo API - status: ${res.status}`);
      throw new BadRequestException('Erro ao conectar na Evo API');
    }

    const data = await res.json();
    this.logger.log(`Conexão com Evo API estabelecida com sucesso`);
    return data;
  }

  async sendMessage(to: string, message: string): Promise<any> {
    this.logger.log(`Enviando mensagem de texto para: ${to}`);
    const payload = {
      number: to,
      text: message,
    };

    const res = await fetch(
      `${this.baseUrl}/messages/sendText/${this.instanceName}`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      this.logger.error(`Falha ao enviar mensagem - status: ${res.status}`);
      throw new BadRequestException('Erro ao enviar mensagem na Evo API');
    }

    const data = await res.json();
    this.logger.log(`Mensagem enviada com sucesso para: ${to}`);
    return data;
  }

  async sendMedia(
    to: string,
    mediaBase64: string,
    fileName: string,
    caption?: string,
  ): Promise<any> {
    this.logger.log(`Enviando mídia para: ${to} - arquivo: ${fileName}`);
    const payload = {
      number: to,
      mediatype: 'document',
      mimetype: 'application/pdf',
      caption: caption || '',
      media: mediaBase64,
      fileName: fileName,
    };

    const res = await fetch(
      `${this.baseUrl}/message/sendMedia/${this.instanceName}`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      this.logger.error(
        `Falha ao enviar mídia - erro: ${errorText} - status: ${res.status}`,
      );
      throw new BadRequestException('Erro ao enviar mídia na Evo API');
    }

    const data = await res.json();
    this.logger.log(`Mídia enviada com sucesso para: ${to}`);
    return data;
  }
}
