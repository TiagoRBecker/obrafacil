import { PrismaService } from '../../../db/prisma';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';
export declare class UserRepo extends UserRepositoryInterface {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    create(user: UserEntity): Promise<UserEntity>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findById(id: string): Promise<UserEntity | null>;
}
