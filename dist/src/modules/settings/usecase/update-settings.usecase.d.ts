import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
export declare class UpdateSettingsUseCase {
    private readonly settingsRepository;
    private readonly logger;
    constructor(settingsRepository: SettingsRepositoryInterface);
    execute(id: string, input: UpsertSettingsDto): Promise<SettingsResponseDto>;
}
