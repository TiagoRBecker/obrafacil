import { randomUUID } from 'node:crypto';

import {
  Injectable,
  Logger,
} from '@nestjs/common';

import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { SettingsMapper } from './settings.mapper';
import { CreateSettingsDto } from '../dto/create-settings-dto';


@Injectable()
export class CreatetSettingsUseCase {
  private readonly logger = new Logger(CreatetSettingsUseCase.name);

  constructor(
    private readonly settingsRepository: SettingsRepositoryInterface,
    
  ) {}

  async execute(
    input: CreateSettingsDto,
    userId: string,
  ): Promise<SettingsResponseDto> {
    this.logger.log(`Upsert de configurações para usuário - userId: ${userId}`);
  

    const settingsEntity = SettingsEntity.create({
      id:"",
      name: input.name,
      specialty: input.specialty,
      phone: input.phone,
      email: input.email,
      address: input.address,
      logoUrl: input.logoUrl,
    });


 
    const data =  await this.settingsRepository.create(settingsEntity)
    return SettingsMapper.toResponse(data);
  }
}
