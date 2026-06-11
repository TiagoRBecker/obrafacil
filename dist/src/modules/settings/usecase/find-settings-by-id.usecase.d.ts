import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
export declare class FindSettingsByIdUseCase {
    private readonly settingsRepository;
    private readonly logger;
    constructor(settingsRepository: SettingsRepositoryInterface);
    execute(): Promise<SettingsResponseDto>;
}
