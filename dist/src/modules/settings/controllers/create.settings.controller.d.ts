import { SettingsResponseDto } from '../dto/settings-response.dto';
import { CreatetSettingsUseCase } from '../usecase/create-settings-usecase';
import { CreateSettingsDto } from '../dto/create-settings-dto';
export declare class CreateSettingsController {
    private readonly createSettingsUseCase;
    constructor(createSettingsUseCase: CreatetSettingsUseCase);
    create(req: any, body: CreateSettingsDto): Promise<SettingsResponseDto>;
}
