import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { WhatsAppRepositoryInterface } from './whatsapp-repo-interface';
import { WhatsAppSession } from '../entity/whatsapp-session.entity';

@Injectable()
export class WhatsAppRepo extends WhatsAppRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(session: WhatsAppSession): Promise<WhatsAppSession> {
    const { instance, status, qrCode } = session.props;

    const created = await this.prisma.whatsAppSession.create({
      data: { instance, status, qrCode },
    });

    return WhatsAppSession.create({
      instance: created.instance,
      status: created.status,
      id: created.id,
      qrCode: created.qrCode,
    });
  }

  async findBySession(name: string): Promise<WhatsAppSession | null> {
    const session = await this.prisma.whatsAppSession.findUnique({
      where: { instance: name },
    });

    if (!session) return null;

    return WhatsAppSession.create({
      instance: session.instance,
      status: session.status,
      id: session.id,
      qrCode: session.qrCode,
    });
  }

  async update(session: WhatsAppSession): Promise<WhatsAppSession> {
    const { instance, status, qrCode } = session.props;

    const updated = await this.prisma.whatsAppSession.update({
      where: { instance },
      data: { instance, status, qrCode },
    });

    return WhatsAppSession.create({
      instance: updated.instance,
      status: updated.status,
      id: updated.id,
      qrCode: updated.qrCode,
    });
  }
  async findByFirstSession(): Promise<WhatsAppSession | null> {
    const session = await this.prisma.whatsAppSession.findFirst({});

    if (!session) return null;

    return WhatsAppSession.create({
      instance: session.instance,
      status: session.status,
      id: session.id,
      qrCode: session.qrCode,
    });
  }
}
