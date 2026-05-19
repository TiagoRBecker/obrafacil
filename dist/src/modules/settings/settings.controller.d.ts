import { SettingsIdParamDto } from './dto/settings-id-param.dto';
import { SettingsResponseDto } from './dto/settings-response.dto';
import { UpsertSettingsDto } from './dto/upsert-settings.dto';
import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    create(req: any, body: UpsertSettingsDto): Promise<SettingsResponseDto>;
    update(params: SettingsIdParamDto, body: UpsertSettingsDto): Promise<SettingsResponseDto>;
    findById(req: any): Promise<SettingsResponseDto>;
}
