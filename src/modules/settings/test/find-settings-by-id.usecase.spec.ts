import 'reflect-metadata';

import { NotFoundException } from '@nestjs/common';

import { DefaultBillingUnit } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepository } from '../repo/settings.repository';
import { FindSettingsByIdUseCase } from '../usecase/find-settings-by-id.usecase';

type SettingsRepositoryMock = jest.Mocked<SettingsRepository>;

function createRepositoryMock(): SettingsRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
  };
}

describe('FindSettingsByIdUseCase', () => {
  let settingsRepository: SettingsRepositoryMock;
  let useCase: FindSettingsByIdUseCase;

  beforeEach(() => {
    settingsRepository = createRepositoryMock();
    useCase = new FindSettingsByIdUseCase(settingsRepository);
  });

  it('should find settings by id successfully', async () => {
    settingsRepository.findById.mockResolvedValue(
      SettingsEntity.create({
        id: 'settings-1',
        name: 'Joao Mendonca',
        specialty: 'Electrician',
        phone: '(11) 98765-4321',
        email: 'joao@eletrica.com',
        address: 'Sao Paulo',
        logoUrl: 'https://example.com/logo.png',
        proposalTerms: 'Proposal terms',
        warrantyTerms: 'Warranty terms',
        proposalValidityDays: 7,
        defaultBillingUnit: DefaultBillingUnit.HOUR,
        createdAt: new Date('2026-03-01T10:00:00.000Z'),
        updatedAt: new Date('2026-03-01T10:00:00.000Z'),
      }),
    );

    const result = await useCase.execute('settings-1');

    expect(settingsRepository.findById).toHaveBeenCalledWith('settings-1');
    expect(result).toMatchObject({
      id: 'settings-1',
      name: 'Joao Mendonca',
      specialty: 'Electrician',
      email: 'joao@eletrica.com',
    });
  });

  it('should throw when settings are not found', async () => {
    settingsRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing-id')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
