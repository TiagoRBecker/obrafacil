import { randomUUID } from 'node:crypto';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { SettingsMapper } from './settings.mapper';


@Injectable()
export class UpsertSettingsUseCase {
  private readonly logger = new Logger(UpsertSettingsUseCase.name);

  constructor(
    private readonly settingsRepository: SettingsRepositoryInterface,
    
  ) {}

  async execute(
    input: UpsertSettingsDto,
    userId: string,
  ): Promise<SettingsResponseDto> {
    this.logger.log(`Upsert de configurações para usuário - userId: ${userId}`);
  

    const settingsEntity = SettingsEntity.create({
      id:input.id,
      name: input.name,
      specialty: input.specialty,
      phone: input.phone,
      email: input.email,
      address: input.address,
      logoUrl: input.logoUrl,
    });

    let savedSettings: SettingsEntity;
    /*
    if (account.settingsId) {
      this.logger.log(`Atualizando configurações existentes - settingsId: ${account.settingsId}`);
      savedSettings = await this.settingsRepository.update(settingsEntity);
    } else {
      this.logger.log(`Criando novas configurações para usuário - userId: ${userId}`);
      savedSettings = await this.settingsRepository.create(settingsEntity, userId);
    }

    this.logger.log(`Configurações salvas com sucesso - ID: ${savedSettings.id}`);
*/
 
  await this.settingsRepository.create(settingsEntity)
    return SettingsMapper.toResponse(settingsEntity);
  }
}
