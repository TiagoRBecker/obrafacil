import { Injectable, Logger } from '@nestjs/common';
import { UpdateStatusConnectionUseCase } from './update-status-connection-usecase';

// ─── Tipos dos payloads da EvoAPI ────────────────────────────────────────────

interface ConnectionUpdateData {
  instance: string;
  state: 'open' | 'close' | 'connecting' | 'refused';
  statusReason?: number;
}

interface MessagesUpsertData {
  key: { id: string; remoteJid: string; fromMe: boolean };
  message: Record<string, any>;
  messageType: string;
  status: string;
}

interface QrCodeUpdatedData {
  qrcode: { base64: string; code: string };
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * statusReason === 401 → logout manual / sessão expirada (precisa de QR)
 * statusReason === 408 → timeout de conexão (pode tentar reconectar)
 * statusReason === 428 → stream error (pode tentar reconectar)
 * statusReason === 500 → erro interno (pode tentar reconectar)
 */
const REQUIRES_QR_REASONS = new Set([401, 403]);

interface MessagesUpsertData {
  key: { id: string; remoteJid: string; fromMe: boolean };
  message: Record<string, any>;
  messageType: string;
  status: string;
}

interface QrCodeUpdatedData {
  qrcode: { base64: string; code: string };
}
@Injectable()
export class EventDispatcherService {
  private readonly logger = new Logger(EventDispatcherService.name);

  constructor(
    private readonly UpdateStatusConnectionUseCase: UpdateStatusConnectionUseCase,
  ) {}

  async execute(payload): Promise<void> {


    switch (payload.event) {
      case 'connection.update':
        await this.UpdateStatusConnectionUseCase.execute(
          payload.data as ConnectionUpdateData,
          payload.instance,
        );

        break;

      case 'qrcode.updated':
        await this.UpdateStatusConnectionUseCase.execute(
          payload.data as QrCodeUpdatedData,
          payload.instance,
        );
        break;

      case 'messages.update':
        console.log(payload, `atualização de mensagem  update `);
        break;

      default:
        this.logger.debug(
          `[${payload.instance}] Evento não tratado: ${payload.event}`,
        );
    }
  }
}
// ─── Handlers ──────────────────────────────────────────────────────────────
/*
  private async onConnectionUpdate(
    instanceName: string,
    data: ConnectionUpdateData,
  ): Promise<void> {
    const state = data.state ?? (data as any).instance?.state;

    this.logger.log(
      `[${instanceName}] connection.update → state: ${state}, reason: ${data.statusReason ?? 'n/a'}`,
    );

    if (state === 'open') {
      this.connectionState.setState(instanceName, 'open');
      this.reconnect.cancelReconnect(instanceName);
      return;
    }

    if (state === 'close' || state === 'refused') {
      this.connectionState.setState(instanceName, 'close');

      // Sessão expirada ou logout → precisa de QR Code, não adianta reconectar
      if (REQUIRES_QR_REASONS.has(data.statusReason)) {
        this.connectionState.markAsRequiresQrCode(instanceName);
        this.logger.warn(`[${instanceName}] Sessão expirada (reason ${data.statusReason}) — aguardando QR Code`);
        // 👉 Aqui você pode disparar uma notificação para o cliente
        return;
      }

      // Desconexão recuperável → tenta reconectar
      this.reconnect.scheduleReconnect(instanceName);
      return;
    }

    if (state === 'connecting') {
      this.connectionState.setState(instanceName, 'connecting');
    }
  }

  private onQrCodeUpdated(instanceName: string, data: QrCodeUpdatedData): void {
    this.logger.log(`[${instanceName}] QR Code atualizado`);
    this.connectionState.setState(instanceName, 'close');
    // 👉 Salve o base64 do QR Code se quiser exibir no painel:
    // this.connectionState.setQrCode(instanceName, data.qrcode.base64);
  }

  private async onMessagesUpsert(instanceName: string, data: MessagesUpsertData): Promise<void> {
    // Implemente sua lógica de negócio aqui
    this.logger.debug(`[${instanceName}] Nova mensagem recebida: ${data.key?.id}`);
  }

  private async onMessagesUpdate(instanceName: string, data: any): Promise<void> {
    // Implemente sua lógica de atualização de status aqui
    this.logger.debug(`[${instanceName}] Mensagem atualizada: keyId=${data.keyId}, status=${data.status}`);
  }
}

*/
