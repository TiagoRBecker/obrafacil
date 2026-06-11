import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';

@Injectable()
export class SettingsRepo extends SettingsRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findByfirst(): Promise<SettingsEntity | null> {
    const data = await this.prisma.settings.findFirst({});

    if (!data) return null;

    return SettingsEntity.create({
      email: data.email,
      id: data.id,
      name: data.businessName ?? '',
      phone: data.phone,
      specialty: data.specialty,
      address: data.address ?? '',
      logoUrl: data.logoUrl ?? '',
    });
  }
  async findByEmail(email: string): Promise<SettingsEntity | null> {
    const data = await this.prisma.settings.findUnique({
      where: { email },
    });

    if (!data) return null;

    return SettingsEntity.create({
      email: data.email,
      id: data.id,
      name: data.businessName ?? '',
      phone: data.phone,
      specialty: data.specialty,
      address: data.address ?? '',
      logoUrl: data.logoUrl ?? '',
    });
  }

  async create(settings: SettingsEntity): Promise<SettingsEntity> {
    const data = await this.prisma.settings.create({
      data: {
        email: settings.email,
        businessName: settings.name,
        phone: settings.phone,
        specialty: settings.specialty,
        address: settings.address,
        logoUrl: settings.logoUrl,
        defaultBillingUnit: '',
        proposalValidityDays: 7,
        proposalTerms: '',
        warrantyTerms: '',
      },
    });

    return SettingsEntity.create({
      
      email: data.email,
      id: data.id,
      name: data.businessName ?? '',
      phone: data.phone,
      specialty: data.specialty,
      address: data.address ?? '',
      logoUrl: data.logoUrl ?? '',
    });
  }
  async update(settings: SettingsEntity): Promise<SettingsEntity> {
    const data = await this.prisma.settings.update({
      where: { id: settings.id },
      data: {
        businessName: settings.name,
        phone: settings.phone,
        specialty: settings.specialty,
        address: settings.address,
        logoUrl: settings.logoUrl,
      },
    });

    return SettingsEntity.create({
      email: data.email,
      id: data.id,
      name: data.businessName ?? '',
      phone: data.phone,
      specialty: data.specialty,
      address: data.address ?? '',
      logoUrl: data.logoUrl ?? '',
    });
  }
}
