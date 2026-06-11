import { PrismaService } from '../../../db/prisma';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';
import { UserWithContextDto } from './mapper.user.repo';
export declare class UserRepo extends UserRepositoryInterface {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: UserEntity): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserWithContextDto | null>;
    findById(id: string): Promise<UserWithContextDto | null>;
}
