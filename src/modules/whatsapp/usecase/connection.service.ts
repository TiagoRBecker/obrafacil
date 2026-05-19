import { Inject, Injectable, Logger } from '@nestjs/common';
import { EvoApiClient } from '../../evo/infra/evo-api.client';


@Injectable()
export class ConnectionUSeCase {
  private readonly logger = new Logger(ConnectionUSeCase.name);

  constructor(private readonly evoService: EvoApiClient) {}

  async execute(): Promise<any> {
    try {
      this.logger.log('Iniciando conexão com WhatsApp');
      const data = await this.evoService.connect();
      this.logger.log('Conexão com WhatsApp estabelecida com sucesso');
      return data;
    } catch (error) {
      this.logger.error(`Erro ao conectar com WhatsApp: ${error.message || error}`);
      throw error;
    }
  }
}
