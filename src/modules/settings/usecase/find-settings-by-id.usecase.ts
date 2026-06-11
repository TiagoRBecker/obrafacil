import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { SettingsMapper } from './settings.mapper';


@Injectable()
export class FindSettingsByIdUseCase {
  private readonly logger = new Logger(FindSettingsByIdUseCase.name);

  constructor(
    private readonly settingsRepository: SettingsRepositoryInterface,

  ) {}

  async execute(): Promise<SettingsResponseDto> {
     
    this.logger.log(`Buscando configurações para usuário `);

               

    const settings = await this.settingsRepository.findByfirst();

    if (!settings) {
      this.logger.error(`Configurações não encontradas - userId: }`);
      throw new NotFoundException(`Nenhuma configuraçao encontra`)
    }

    this.logger.log(`Configurações encontradas com sucesso `);
    const data = SettingsMapper.toResponse(settings);

    return data;
  }
}
