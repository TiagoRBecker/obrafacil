import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';
export declare class MockSettingsRepository implements SettingsRepositoryInterface {
    private readonly settings;
    create(settings: SettingsEntity): Promise<SettingsEntity>;
    update(settings: SettingsEntity): Promise<SettingsEntity>;
    findByfirst(): Promise<SettingsEntity | null>;
    findByEmail(email: string): Promise<SettingsEntity | null>;
}
