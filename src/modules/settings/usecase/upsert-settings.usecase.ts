import { randomUUID } from 'node:crypto';

import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { SettingsMapper } from './settings.mapper';
import { PrismaService } from '../../../db/prisma';

@Injectable()
export class UpsertSettingsUseCase {
  private readonly logger = new Logger(UpsertSettingsUseCase.name);

  constructor(
    private readonly settingsRepository: SettingsRepositoryInterface,
    private readonly prisma: PrismaService,
  ) {}

  async execute(
    input: UpsertSettingsDto,
    userId: string,
  ): Promise<SettingsResponseDto> {
    this.logger.log(`Upsert de configurações para usuário - userId: ${userId}`);

    const account = await this.prisma.account.findUnique({
      where: { id: userId },
      include: { settings: true },
    });

    if (!account) {
      this.logger.error(`Usuário não encontrado - userId: ${userId}`);
      throw new UnauthorizedException('Não autorizado');
    }

    const settingsEntity = SettingsEntity.create({
      id: account.settingsId ?? randomUUID(),
      name: input.name,
      specialty: input.specialty,
      phone: input.phone,
      email: input.email,
      address: input.address,
      logoUrl: input.logoUrl,
    });

    let savedSettings: SettingsEntity;

    if (account.settingsId) {
      this.logger.log(`Atualizando configurações existentes - settingsId: ${account.settingsId}`);
      savedSettings = await this.settingsRepository.update(settingsEntity);
    } else {
      this.logger.log(`Criando novas configurações para usuário - userId: ${userId}`);
      savedSettings = await this.settingsRepository.create(settingsEntity, userId);
    }

    this.logger.log(`Configurações salvas com sucesso - ID: ${savedSettings.id}`);

    return SettingsMapper.toResponse(savedSettings);
  }
}
