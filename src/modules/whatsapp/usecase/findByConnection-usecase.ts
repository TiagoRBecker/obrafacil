import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EvoApiClient } from '../../evo/infra/evo-api.client';
import { WhatsAppSession } from '../entity/whatsapp-session.entity';
import { WhatsAppRepositoryInterface } from '../repo/whatsapp-repo-interface';

@Injectable()
export class GetConnectionUseCase {
  private readonly logger = new Logger(GetConnectionUseCase.name);

  constructor(
    private readonly evoService: EvoApiClient,
    private readonly whatsappRepo: WhatsAppRepositoryInterface,
  ) {}

  async execute(instanceName: string): Promise<any> {
    const session = await this.whatsappRepo.findBySession(instanceName);
    if (!session?.props.instance)
      throw new NotFoundException(`Nenhuma instancia   criada  `);

    try {
      if (
        session.props.status === 'closed' ||
        session.props.status === 'refused'
      ) {

         this.logger.log('Conexao status closed  /refused   necessario criar  uma nova');
        const data = await this.evoService.connect(
          session?.props.instance as string,
        );
        const createNewSession = WhatsAppSession.create({
          instance: session.props.instance,
          status: 'connecting',
          qrCode: data.base64,
        });
        const updateNewSession =
          await this.whatsappRepo.update(createNewSession);
        const { qrCode, status } = updateNewSession.props;
        return { qrCode, status };
      }

   

     
      const { qrCode, status } = session.props;
      this.logger.log('Conexao ainda valida  nao necessario criar  uma nova');
      return { qrCode, status };
    } catch (error: any) {
      this.logger.error(
        `Erro ao atualizar a instancia  com WhatsApp: ${error.message || error}`,
      );
      throw error;
    }
  }
}
