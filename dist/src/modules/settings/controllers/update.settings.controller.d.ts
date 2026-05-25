import { SettingsIdParamDto } from '../dto/settings-id-param.dto';
import { UpsertSettingsDto } from '../dto/upsert-settings.dto';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { UpdateSettingsUseCase } from '../usecase/update-settings.usecase';
export declare class UpdateSettingsController {
    private readonly updateSettingsUseCase;
    constructor(updateSettingsUseCase: UpdateSettingsUseCase);
    update(params: SettingsIdParamDto, body: UpsertSettingsDto): Promise<SettingsResponseDto>;
}
