import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { EvoApiClient } from '../../evo/infra/evo-api.client';
import { WhatsAppSession } from '../entity/whatsapp-session.entity';
import { WhatsAppRepositoryInterface } from '../repo/whatsapp-repo-interface';

@Injectable()
export class CreateConnectionUseCase {
  private readonly logger = new Logger(CreateConnectionUseCase.name);

  constructor(
    private readonly evoService: EvoApiClient,
    private readonly whatsappRepo: WhatsAppRepositoryInterface,
  ) {}

  async execute(instanceName: string): Promise<any> {
    const session = await this.whatsappRepo.findBySession(instanceName);
    if (session?.props.instance)
      throw new ConflictException(`Já existe uma instancia criada `);

    try {
      const createInstance = await this.evoService.create(instanceName);

      this.logger.log(
        `Criando instancia nova  ${createInstance.instance.instanceName}`,
      );
      const data = await this.evoService.connect(instanceName);
      const createNewSession = WhatsAppSession.create({
        instance: createInstance.instance.instanceName,
        status: 'connecting',
        qrCode: data.base64,
      });

      const newSession = await this.whatsappRepo.create(createNewSession);
      const { status, qrCode } = newSession.props;
      this.logger.log(
        `Conexao criada  ${createInstance.instance.instanceName}`,
      );
      return { status, qrCode };
    } catch (error: any) {
      this.logger.error(
        `Erro ao conectar com WhatsApp: ${error.message || error}`,
      );
      throw error;
    }
  }
}
