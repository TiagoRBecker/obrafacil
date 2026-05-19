import { Injectable } from '@nestjs/common';

import { DefaultBillingUnit } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';

@Injectable()
export class MockSettingsRepository implements SettingsRepositoryInterface {
  private readonly settings = new Map<string, SettingsEntity>([
    [
      'settings-1',
      SettingsEntity.create({
        id: 'settings-1',
        name: 'Joao Mendonca',
        specialty: 'Electrician',
        phone: '(11) 98765-4321',
        email: 'joao@eletrica.com',
        address: 'Sao Paulo e Grande ABC',
        logoUrl: 'https://example.com/logo.png',
       
      }),
    ],
  ]);

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
}
