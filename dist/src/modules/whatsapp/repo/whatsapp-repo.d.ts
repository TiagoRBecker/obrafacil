import { PrismaService } from '../../../db/prisma';
import { WhatsAppRepositoryInterface } from './whatsapp-repo-interface';
import { WhatsAppSession } from '../entity/whatsapp-session.entity';
export declare class WhatsAppRepo extends WhatsAppRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(session: WhatsAppSession): Promise<WhatsAppSession>;
    findBySession(name: string): Promise<WhatsAppSession | null>;
    update(session: WhatsAppSession): Promise<WhatsAppSession>;
    findByFirstSession(): Promise<WhatsAppSession | null>;
}
