import { Prisma } from '@prisma/client';
import { UserEntity } from '../entity/user.entity';
export type UserPermission = Prisma.AccountGetPayload<{
    include: {
        role: {
            include: {
                permissions: {
                    include: {
                        permission: true;
                    };
                };
            };
        };
    };
}>;
export declare class MapperToPrisma {
    constructor();
    static toDto(data: UserPermission): UserEntity;
}
