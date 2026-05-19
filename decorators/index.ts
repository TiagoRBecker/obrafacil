// src/shared/decorators/permissions.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Permission, UserRole } from './types';

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = ( ...permissions: Permission[]) => SetMetadata(PERMISSIONS_KEY, permissions);



export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);