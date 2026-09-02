import { Injectable } from '@nestjs/common';

import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';
import { randomUUID } from 'crypto';

@Injectable()
export class InMemorySettingsRepository implements SettingsRepositoryInterface {
  private readonly settings = new Map<string, SettingsEntity>();

  async create(settings: SettingsEntity): Promise<SettingsEntity> {
    const id = settings.id || randomUUID();
    const entity = SettingsEntity.toDTO({ ...settings.toJSON(), id });
    this.settings.set(id, entity);
    return entity;

  }

  async update(settings: SettingsEntity): Promise<SettingsEntity> {
    this.settings.set(settings.id, settings);
    return settings;
  }

  async findByfirst(): Promise<SettingsEntity | null> {
    const first = this.settings.values().next();
    return first.done ? null : first.value;
  }
  async findByEmail(email: string): Promise<SettingsEntity | null> {
    return this.settings.get(email) ?? null;
  }
}
