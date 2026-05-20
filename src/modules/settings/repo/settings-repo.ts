import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../../../db/prisma';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';

@Injectable()
export class SettingsRepo extends SettingsRepositoryInterface {
  private readonly logger = new Logger(SettingsRepo.name);

  constructor(private readonly prisma: PrismaService) {
    super();
  }
  async findById(email: string): Promise<SettingsEntity | null> {
    try {
      const data = await this.prisma.settings.findUnique({
        where: {
          email:email
          
        },
      });
      return SettingsEntity.create({
        email: data?.email as string,
        id: data?.id as string,
        name: data?.businessName as string,
        phone: data?.phone as string,
        specialty: data?.specialty as string,
        address: data?.address as string,
        logoUrl: data?.logoUrl as string,
      });
    } catch (error) {
      this.logger.error('Erro ao criar ', {
        error,
        operation: 'CREATE',
        entity: 'SettingsEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível criar  o cliente. Tente novamente.`,
      );
    }
  }
  async create(settings: SettingsEntity): Promise<SettingsEntity> {
    const { address, email, logoUrl, name, phone, specialty } = settings;
    try {
      const data = await this.prisma.settings.create({
        data: {
          email,
          businessName: name,
          phone,
          specialty,
          address,
          logoUrl,
          defaultBillingUnit: '',
          proposalValidityDays: 7,
          proposalTerms: '',
          warrantyTerms: '',
        },
      });
      return SettingsEntity.create({
        email: data.email,
        id: data.id,
        name: data.businessName as string,
        phone: data.phone,
        specialty: data.specialty,
        address: data.address as string,
        logoUrl: data.logoUrl as string,
      });
    } catch (error) {
      this.logger.error('Erro ao criar ', {
        error,
        operation: 'CREATE',
        entity: 'SettingsEntity',
      });
      throw new InternalServerErrorException(
        `Não foi possível criar  o cliente. Tente novamente.`,
      );
    }
  }
  async update(settings: SettingsEntity): Promise<SettingsEntity> {
    throw '';
  }
}
