import { PrismaService } from '../../../db/prisma';
import { SettingsEntity } from '../entity/settings.entity';
import { SettingsRepositoryInterface } from './settings.repository';
export declare class SettingsRepo extends SettingsRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<SettingsEntity | null>;
    findByEmail(email: string): Promise<SettingsEntity | null>;
    create(settings: SettingsEntity, id: string): Promise<SettingsEntity>;
    update(settings: SettingsEntity): Promise<SettingsEntity>;
}
