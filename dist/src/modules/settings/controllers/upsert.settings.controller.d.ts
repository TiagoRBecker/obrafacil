import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpsertSettingsUseCase } from '../usecase/upsert-settings.usecase';
export declare class UpsertSettingsController {
    private readonly upsertSettingsUseCase;
    constructor(upsertSettingsUseCase: UpsertSettingsUseCase);
    upsert(req: any, body: UpsertSettingsDto): Promise<SettingsResponseDto>;
}
