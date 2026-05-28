import { SettingsResponseDto } from '../dto/settings-response.dto';
import { SettingsEntity } from '../entity/settings.entity';

export class SettingsMapper {
  static toResponse(settings: SettingsEntity): SettingsResponseDto {
    return {
      id: settings.id,
      name: settings.name,
      specialty: settings.specialty,
      logoUrl: settings.logoUrl,
      address:settings.address,
      email:settings.email,
     phone:settings.phone
    };
  }
}
