import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';
import { UserWithContextDto } from './mapper.user.repo';
export declare class InMemoryUserRepository implements UserRepositoryInterface {
    private readonly data;
    constructor(seed?: Record<string, UserWithContextDto>);
    findByEmail(email: string): Promise<UserWithContextDto | null>;
    findById(id: string): Promise<UserWithContextDto | null>;
    create(user: UserEntity): Promise<UserEntity>;
}
