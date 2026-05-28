import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsEntity } from '../entity/settings.entity';
export declare class SettingsMapper {
    static toResponse(settings: SettingsEntity): SettingsResponseDto;
}
