import { Prisma } from '@prisma/client';
import { UserEntity } from '../entity/user.entity';
import { settings } from 'node:cluster';

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
export class MapperToPrisma {
  constructor() {}
  static toDto(data: UserPermission): UserEntity {
    return UserEntity.toDto({
      id: data?.id,
      email: data?.email,
      name: data?.name,
      passwordHash: data?.password,
      role: data?.role?.name ?? '',
      permission: data?.role?.permissions.map((p) => p.permission.name) ?? [],
      settingsId: data?.settingsId ?? '',
    });
  }
}
