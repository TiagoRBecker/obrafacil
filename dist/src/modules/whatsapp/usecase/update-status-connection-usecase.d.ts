import { ConnectionUpdateData, QrCodeUpdatedData } from '../dto/status.dto';
import { WhatsAppRepositoryInterface } from '../repo/whatsapp-repo-interface';
export declare class UpdateStatusConnectionUseCase {
    private readonly whatsappRepo;
    private readonly logger;
    constructor(whatsappRepo: WhatsAppRepositoryInterface);
    execute(payload: QrCodeUpdatedData | ConnectionUpdateData, instanceName: string): Promise<null | undefined>;
    updateQrcode(payload: QrCodeUpdatedData, instanceName: string): Promise<void>;
    updateStatus(payload: ConnectionUpdateData, instanceName: string): Promise<void>;
}
