import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
export declare class UpsertSettingsUseCase {
    private readonly settingsRepository;
    private readonly logger;
    constructor(settingsRepository: SettingsRepositoryInterface);
    execute(input: UpsertSettingsDto, userId: string): Promise<SettingsResponseDto>;
}
