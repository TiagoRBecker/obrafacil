import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { CreateSettingsDto } from '../dto/create-settings-dto';
export declare class CreatetSettingsUseCase {
    private readonly settingsRepository;
    private readonly logger;
    constructor(settingsRepository: SettingsRepositoryInterface);
    execute(input: CreateSettingsDto, userId: string): Promise<SettingsResponseDto>;
}
