import { Injectable } from '@nestjs/common';

import { SettingsResponseDto } from './dto/settings-response.dto';
import { UpsertSettingsDto } from './dto/upsert-settings.dto';
import { CreateSettingsUseCase } from './usecase/create-settings.usecase';
import { FindSettingsByIdUseCase } from './usecase/find-settings-by-id.usecase';
import { UpdateSettingsUseCase } from './usecase/update-settings.usecase';

@Injectable()
export class SettingsService {
  constructor(
    private readonly createSettingsUseCase: CreateSettingsUseCase,
    private readonly updateSettingsUseCase: UpdateSettingsUseCase,
    private readonly findSettingsByIdUseCase: FindSettingsByIdUseCase,
  ) {}

  create(input: UpsertSettingsDto, userId:string): Promise<SettingsResponseDto> {
    return this.createSettingsUseCase.execute(input, userId);
  }

  update(id: string, input: UpsertSettingsDto): Promise<SettingsResponseDto> {
    return this.updateSettingsUseCase.execute(id, input);
  }

  findById(id: string): Promise<SettingsResponseDto> {
    return this.findSettingsByIdUseCase.execute(id);
  }
}
