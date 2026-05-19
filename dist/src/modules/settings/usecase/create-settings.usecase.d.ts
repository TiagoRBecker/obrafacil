import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { UserRepositoryInterface } from '../../auth/repo/user.repository.interface';
export declare class CreateSettingsUseCase {
    private readonly settingsRepository;
    private readonly userRepo;
    private readonly logger;
    constructor(settingsRepository: SettingsRepositoryInterface, userRepo: UserRepositoryInterface);
    execute(input: UpsertSettingsDto, userId: string): Promise<SettingsResponseDto>;
}
