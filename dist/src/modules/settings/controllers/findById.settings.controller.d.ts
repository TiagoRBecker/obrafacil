import { SettingsResponseDto } from '../dto/settings-response.dto';
import { FindSettingsByIdUseCase } from '../usecase/find-settings-by-id.usecase';
export declare class FindByIdSettingsController {
    private readonly findSettingsByIdUseCase;
    constructor(findSettingsByIdUseCase: FindSettingsByIdUseCase);
    findById(req: any): Promise<SettingsResponseDto>;
}
