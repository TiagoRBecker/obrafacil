import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { SettingsMapper } from './settings.mapper';
import { UserRepositoryInterface } from '../../auth/repo/user.repository.interface';

@Injectable()
export class FindSettingsByIdUseCase {
  private readonly logger = new Logger(FindSettingsByIdUseCase.name);

  constructor(private readonly settingsRepository: SettingsRepositoryInterface,private readonly userRepo:UserRepositoryInterface) {}

  async execute(id: string): Promise<SettingsResponseDto> {
    this.logger.log(`Buscando configurações para usuário - ID: ${id}`);
    
    const exustUser = await this.userRepo.findById(id)
    if(!exustUser) {
      this.logger.error(`Usuário não encontrado ou não autorizado - ID: ${id}`);
      throw new UnauthorizedException(`Nao autorizado ou nao encontrado`)
    }
    
    const settings = await this.settingsRepository.findById(exustUser?.settingsId as string);

    if (!settings) {
      this.logger.error(`Configurações não encontradas - userId: ${id}`);
      throw new NotFoundException('Settings not found.');
    }
   
    this.logger.log(`Configurações encontradas com sucesso - userId: ${id}`);
    const data = SettingsMapper.toResponse(settings);
  
    return data
  }
}
