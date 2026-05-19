import { SettingsResponseDto } from './dto/settings-response.dto';
import { UpsertSettingsDto } from './dto/upsert-settings.dto';
import { CreateSettingsUseCase } from './usecase/create-settings.usecase';
import { FindSettingsByIdUseCase } from './usecase/find-settings-by-id.usecase';
import { UpdateSettingsUseCase } from './usecase/update-settings.usecase';
export declare class SettingsService {
    private readonly createSettingsUseCase;
    private readonly updateSettingsUseCase;
    private readonly findSettingsByIdUseCase;
    constructor(createSettingsUseCase: CreateSettingsUseCase, updateSettingsUseCase: UpdateSettingsUseCase, findSettingsByIdUseCase: FindSettingsByIdUseCase);
    create(input: UpsertSettingsDto, userId: string): Promise<SettingsResponseDto>;
    update(id: string, input: UpsertSettingsDto): Promise<SettingsResponseDto>;
    findById(id: string): Promise<SettingsResponseDto>;
}
