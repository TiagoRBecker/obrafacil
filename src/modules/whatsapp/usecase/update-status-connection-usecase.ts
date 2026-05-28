import { Injectable, Logger } from '@nestjs/common';
import { ConnectionUpdateData, QrCodeUpdatedData } from '../dto/status.dto';
import { WhatsAppSession } from '../entity/whatsapp-session.entity';
import { WhatsAppRepositoryInterface } from '../repo/whatsapp-repo-interface';

@Injectable()
export class UpdateStatusConnectionUseCase {
  private readonly logger = new Logger(UpdateStatusConnectionUseCase.name);

  constructor(private readonly whatsappRepo: WhatsAppRepositoryInterface) {}
  async execute(
    payload: QrCodeUpdatedData | ConnectionUpdateData,
    instanceName: string,
  ) {
    const session = await this.whatsappRepo.findBySession(instanceName);
    if (!session?.props.instance) {
      this.logger.error(`Session não encontrada para atualizaçao `);
      return null;
    }
    if ('qrcode' in payload) {
      this.logger.log(
        `Atualizando a sessao do qrcod session ${session.props.instance}`,
      );
      await this.updateQrcode(payload, session.props.instance);
      return;
    }

    await this.updateStatus(
      payload as ConnectionUpdateData,
      session.props.instance,
    );
    return;
  }

  async updateQrcode(
    payload: QrCodeUpdatedData,
    instanceName: string,
  ): Promise<void> {
    const updateSession = WhatsAppSession.create({
      instance: instanceName,
      status: 'connecting',
      qrCode: payload.qrcode.base64,
    });
    await this.whatsappRepo.update(updateSession);
    return;
  }
  async updateStatus(
    payload: ConnectionUpdateData,
    instanceName: string,
  ): Promise<void> {
    
    if (payload.state) {
      const updateSession = WhatsAppSession.create({
        instance: instanceName,
        status: payload.state,
      });
      await this.whatsappRepo.update(updateSession);
      return;
    }
  }
}
