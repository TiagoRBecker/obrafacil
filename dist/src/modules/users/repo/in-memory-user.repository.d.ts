import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';
export declare class InMemoryUserRepository implements UserRepositoryInterface {
    private readonly users;
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(email: string): Promise<UserEntity | null>;
    create(user: UserEntity): Promise<UserEntity>;
    insertSettingsUser(settinsId: string, userId: string): Promise<void>;
}
