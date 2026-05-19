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
    return this.configService.get<string>('evo.istanceName');
  }

  async connect(): Promise<any> {
    this.logger.log(`Iniciando conexão com instância: ${this.instanceName}`);
    const res = await fetch(
      `${this.baseUrl}/instances/connect/${this.instanceName}`,
      {
        method: 'POST',
        headers: this.headers,
      },
    );

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
      this.logger.error(`Falha ao enviar mídia - erro: ${errorText} - status: ${res.status}`);
      throw new BadRequestException('Erro ao enviar mídia na Evo API');
    }

    const data = await res.json();
    this.logger.log(`Mídia enviada com sucesso para: ${to}`);
    return data;
  }
}