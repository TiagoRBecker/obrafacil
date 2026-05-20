import { randomUUID } from 'node:crypto';

import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';

import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { SettingsMapper } from './settings.mapper';
import { UserRepositoryInterface } from '../../Users/repo/user.repository.interface';


@Injectable()
export class CreateSettingsUseCase {
  private readonly logger = new Logger(CreateSettingsUseCase.name);

  constructor(
    private readonly settingsRepository: SettingsRepositoryInterface,
    private readonly userRepo: UserRepositoryInterface,
  ) {}

  async execute(
    input: UpsertSettingsDto,
    userId: string,
  ): Promise<SettingsResponseDto> {
    this.logger.log(`Iniciando criação de configurações para usuário - userId: ${userId}`);
    
    const existBussnines = await this.userRepo.findById(userId)
    if(!existBussnines) {
      this.logger.error(`Usuário não autorizado - userId: ${userId}`);
      throw new UnauthorizedException(`Não autorizado `)
    }
    
  
    
    this.logger.log(`Criando configurações - nome: ${input.name}`);
    const settings = SettingsEntity.create({
      id: randomUUID(),
      name: input.name,
      specialty: input.specialty,
      phone: input.phone,
      email: input.email,
      address: input.address,
      logoUrl: input.logoUrl,
    });

    const createdSettings = await this.settingsRepository.create(settings);
    this.logger.log(`Configurações criadas com sucesso - ID: ${createdSettings.id}`);


    this.logger.log(`Configurações vinculadas ao usuário - userId: ${userId}, settingsId: ${createdSettings.id}`);
    
    return SettingsMapper.toResponse(createdSettings);
  }
}
