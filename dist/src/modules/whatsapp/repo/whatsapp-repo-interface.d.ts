import { WhatsAppSession } from "../entity/whatsapp-session.entity";
export declare abstract class WhatsAppRepositoryInterface {
    abstract create(session: WhatsAppSession): Promise<WhatsAppSession>;
    abstract update(session: WhatsAppSession): Promise<WhatsAppSession>;
    abstract findBySession(name: string): Promise<WhatsAppSession | null>;
}
