import { SettingsEntity } from '../entity/settings.entity';
export declare abstract class SettingsRepositoryInterface {
    abstract create(settings: SettingsEntity): Promise<SettingsEntity>;
    abstract update(settings: SettingsEntity): Promise<SettingsEntity>;
    abstract findByfirst(): Promise<SettingsEntity | null>;
    abstract findByEmail(email: string): Promise<SettingsEntity | null>;
}
