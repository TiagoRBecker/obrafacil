import 'reflect-metadata';

import { NotFoundException } from '@nestjs/common';

import { DefaultBillingUnit, UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepository } from '../repo/settings.repository';
import { UpdateSettingsUseCase } from '../usecase/update-settings.usecase';

type SettingsRepositoryMock = jest.Mocked<SettingsRepository>;

function createRepositoryMock(): SettingsRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
  };
}

describe('UpdateSettingsUseCase', () => {
  let settingsRepository: SettingsRepositoryMock;
  let useCase: UpdateSettingsUseCase;

  beforeEach(() => {
    settingsRepository = createRepositoryMock();
    useCase = new UpdateSettingsUseCase(settingsRepository);
  });

  it('should update settings successfully', async () => {
    const existingSettings = SettingsEntity.create({
      id: 'settings-1',
      name: 'Joao Mendonca',
      specialty: 'Electrician',
      phone: '(11) 98765-4321',
      email: 'joao@eletrica.com',
      address: 'Sao Paulo',
      logoUrl: 'https://example.com/old-logo.png',
      proposalTerms: 'Old proposal terms',
      warrantyTerms: 'Old warranty terms',
      proposalValidityDays: 5,
      defaultBillingUnit: DefaultBillingUnit.DAY,
      createdAt: new Date('2026-03-01T10:00:00.000Z'),
      updatedAt: new Date('2026-03-01T10:00:00.000Z'),
    });

    settingsRepository.findById.mockResolvedValue(existingSettings);
    settingsRepository.update.mockImplementation(async (settings) => settings);

    const input: UpsertSettingsDto = {
      name: 'Joao Silva',
      specialty: 'Senior Electrician',
      phone: '(11) 99999-0000',
      email: 'joao.silva@eletrica.com',
      address: 'Campinas',
      logoUrl: 'https://example.com/new-logo.png',
      proposalTerms: 'New proposal terms',
      warrantyTerms: 'New warranty terms',
      proposalValidityDays: 10,
      defaultBillingUnit: DefaultBillingUnit.FIXED_SERVICE,
    };

    const result = await useCase.execute('settings-1', input);

    expect(settingsRepository.findById).toHaveBeenCalledWith('settings-1');
    expect(settingsRepository.update).toHaveBeenCalledTimes(1);

    const updatedEntity = settingsRepository.update.mock.calls[0][0] as SettingsEntity;
    expect(updatedEntity.id).toBe('settings-1');
    expect(updatedEntity.name).toBe('Joao Silva');
    expect(updatedEntity.email).toBe('joao.silva@eletrica.com');
    expect(updatedEntity.defaultBillingUnit).toBe(DefaultBillingUnit.FIXED_SERVICE);

    expect(result).toMatchObject({
      id: 'settings-1',
      name: 'Joao Silva',
      specialty: 'Senior Electrician',
      email: 'joao.silva@eletrica.com',
      proposalValidityDays: 10,
    });
  });

  it('should throw when settings are not found', async () => {
    settingsRepository.findById.mockResolvedValue(null);

    await expect(
      useCase.execute('missing-id', {
        name: 'Joao Silva',
        specialty: 'Senior Electrician',
        phone: '(11) 99999-0000',
        email: 'joao.silva@eletrica.com',
        address: 'Campinas',
        logoUrl: 'https://example.com/new-logo.png',
        proposalTerms: 'New proposal terms',
        warrantyTerms: 'New warranty terms',
        proposalValidityDays: 10,
        defaultBillingUnit: DefaultBillingUnit.FIXED_SERVICE,
      }),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(settingsRepository.update).not.toHaveBeenCalled();
  });
});
