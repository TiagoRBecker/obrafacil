import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { UserRepositoryInterface } from '../../users/repo/user.repository.interface';
export declare class FindSettingsByIdUseCase {
    private readonly settingsRepository;
    private readonly userRepo;
    private readonly logger;
    constructor(settingsRepository: SettingsRepositoryInterface, userRepo: UserRepositoryInterface);
    execute(id: string): Promise<SettingsResponseDto>;
}
