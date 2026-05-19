import { Injectable, Logger, NotFoundException } from '@nestjs/common';

import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import {  SettingsRepositoryInterface} from '../repo/settings.repository';
import { SettingsMapper } from './settings.mapper';

@Injectable()
export class UpdateSettingsUseCase {
  private readonly logger = new Logger(UpdateSettingsUseCase.name);

  constructor(private readonly settingsRepository: SettingsRepositoryInterface) {}

  async execute(id: string, input: UpsertSettingsDto): Promise<SettingsResponseDto> {
    this.logger.log(`Iniciando atualização de configurações - ID: ${id}`);
    
    const currentSettings = await this.settingsRepository.findById(id);

    if (!currentSettings) {
      this.logger.error(`Configurações não encontradas - ID: ${id}`);
      throw new NotFoundException('Settings not found.');
    }

    this.logger.log(`Atualizando configurações - nome: ${input.name}`);
    const current = currentSettings.toJSON();

    const updatedSettings = SettingsEntity.create({
      ...current,
      name: input.name,
      specialty: input.specialty,
      phone: input.phone,
      email: input.email,
      address: input.address,
      logoUrl: input.logoUrl,

    
    });

    const savedSettings = await this.settingsRepository.update(updatedSettings);
    this.logger.log(`Configurações atualizadas com sucesso - ID: ${id}`);
    
    return SettingsMapper.toResponse(savedSettings);
  }
}
