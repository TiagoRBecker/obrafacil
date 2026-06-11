import { WhatsAppSession } from "../entity/whatsapp-session.entity";



export abstract class WhatsAppRepositoryInterface {
  abstract create(session: WhatsAppSession): Promise<WhatsAppSession>;
  abstract update(session:WhatsAppSession): Promise<WhatsAppSession>;
  abstract findBySession(name: string): Promise<WhatsAppSession | null>;
   abstract findByFirstSession(): Promise<WhatsAppSession | null>;
 
}
