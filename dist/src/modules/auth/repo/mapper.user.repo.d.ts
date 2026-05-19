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
        settings: {
            select: {
                id: true;
                specialty: true;
                businessName: true;
                logoUrl: true;
            };
        };
    };
}>;
export declare class MapperToPrisma {
    constructor();
    static toDto(data: UserPermission): UserEntity;
}
