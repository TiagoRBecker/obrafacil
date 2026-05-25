import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { CreateSettingsUseCase } from '../usecase/create-settings.usecase';
export declare class CreateSettingsController {
    private readonly createSettingsUseCase;
    constructor(createSettingsUseCase: CreateSettingsUseCase);
    create(req: any, body: UpsertSettingsDto): Promise<SettingsResponseDto>;
}
