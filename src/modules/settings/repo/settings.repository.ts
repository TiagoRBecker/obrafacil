import { SettingsEntity } from '../entity/settings.entity';

export abstract class SettingsRepositoryInterface {
  abstract create(settings: SettingsEntity,id:string): Promise<SettingsEntity>;
  abstract update(settings: SettingsEntity): Promise<SettingsEntity>;
  abstract findById(id: string): Promise<SettingsEntity | null>;
   abstract findByEmail(email: string): Promise<SettingsEntity | null>;
}
