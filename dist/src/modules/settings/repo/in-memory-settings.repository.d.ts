import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';
export declare class InMemorySettingsRepository implements SettingsRepositoryInterface {
    private readonly settings;
    create(settings: SettingsEntity): Promise<SettingsEntity>;
    update(settings: SettingsEntity): Promise<SettingsEntity>;
    findById(id: string): Promise<SettingsEntity | null>;
}
