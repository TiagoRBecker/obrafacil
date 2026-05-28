import { Injectable } from '@nestjs/common';

import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';

@Injectable()
export class InMemorySettingsRepository implements SettingsRepositoryInterface {
  private readonly settings = new Map<string, SettingsEntity>();

  async create(settings: SettingsEntity): Promise<SettingsEntity> {
    this.settings.set(settings.id, settings);
    return settings;
  }

  async update(settings: SettingsEntity): Promise<SettingsEntity> {
    this.settings.set(settings.id, settings);
    return settings;
  }

  async findById(id: string): Promise<SettingsEntity | null> {
    return this.settings.get(id) ?? null;
  }
  async findByEmail(email: string): Promise<SettingsEntity | null> {
    return this.settings.get(email) ?? null;
  }
}
