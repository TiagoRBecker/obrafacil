import 'reflect-metadata';

import { DefaultBillingUnit, UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepository } from '../repo/settings.repository';
import { CreateSettingsUseCase } from '../usecase/create-settings.usecase';

type SettingsRepositoryMock = jest.Mocked<SettingsRepository>;

function createRepositoryMock(): SettingsRepositoryMock {
  return {
    create: jest.fn(),
    update: jest.fn(),
    findById: jest.fn(),
  };
}

describe('CreateSettingsUseCase', () => {
  let settingsRepository: SettingsRepositoryMock;
  let useCase: CreateSettingsUseCase;

  beforeEach(() => {
    settingsRepository = createRepositoryMock();
    useCase = new CreateSettingsUseCase(settingsRepository);
  });

  it('should create settings successfully', async () => {
    settingsRepository.create.mockImplementation(async (settings) => settings);

    const input: UpsertSettingsDto = {
      name: ' Joao Mendonca ',
      specialty: ' Electrician ',
      phone: ' (11) 98765-4321 ',
      email: ' JOAO@ELETRICA.COM ',
      address: ' Sao Paulo e Grande ABC ',
      logoUrl: 'https://example.com/logo.png',
      proposalTerms: ' 50% upfront and 50% on completion ',
      warrantyTerms: ' 90-day warranty ',
      proposalValidityDays: 7,
      defaultBillingUnit: DefaultBillingUnit.HOUR,
    };

    const result = await useCase.execute(input);

    expect(settingsRepository.create).toHaveBeenCalledTimes(1);

    const createdEntity = settingsRepository.create.mock.calls[0][0] as SettingsEntity;
    expect(createdEntity.name).toBe('Joao Mendonca');
    expect(createdEntity.specialty).toBe('Electrician');
    expect(createdEntity.phone).toBe('(11) 98765-4321');
    expect(createdEntity.email).toBe('joao@eletrica.com');

    expect(result.name).toBe('Joao Mendonca');
    expect(result.specialty).toBe('Electrician');
    expect(result.email).toBe('joao@eletrica.com');
    expect(result.defaultBillingUnit).toBe(DefaultBillingUnit.HOUR);
    expect(result.id).toBeTruthy();
  });
});
