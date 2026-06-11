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
export interface UserWithContextDto {
    id: string;
    name: string;
    email: string;
    role: string;
    permission?: any[];
    passwordHash: string;
}
export declare class MapperToPrisma {
    constructor();
    static toDto(data: UserPermission): UserEntity;
    static toDtoContext(raw: UserPermission): UserWithContextDto;
}
