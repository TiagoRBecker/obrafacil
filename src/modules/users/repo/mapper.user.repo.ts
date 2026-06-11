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
  permission?:any[];
  passwordHash: string;

}
export class MapperToPrisma {
  constructor() {}
  static toDto(data: UserPermission): UserEntity {
    return UserEntity.toDto({
      id: data?.id,
      email: data?.email,
      name: data?.name,
      passwordHash: data?.password,
      role: data?.role?.name ?? '',
    });
  }
  static toDtoContext(raw: UserPermission): UserWithContextDto {
    return {
      id: raw.id,
      email: raw.email,
      name: raw.name,
      passwordHash: raw.password,
      role: raw.role?.name ?? '',
      permission: raw.role?.permissions,
      
    };
  }
}
