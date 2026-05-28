import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsRepositoryInterface } from '../repo/settings.repository';
import { PrismaService } from '../../../db/prisma';
export declare class UpsertSettingsUseCase {
    private readonly settingsRepository;
    private readonly prisma;
    private readonly logger;
    constructor(settingsRepository: SettingsRepositoryInterface, prisma: PrismaService);
    execute(input: UpsertSettingsDto, userId: string): Promise<SettingsResponseDto>;
}
