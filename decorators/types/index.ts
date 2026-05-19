export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  SELLER = 'seller',
}


export const resources = [
  'account',
  'customer',
  'order',
  'team',
  'settings',
] as const;

export const actions = [
  'create',
  'read',
  'update',
  'delete',
] as const;

type Resource = typeof resources[number];
type Action = typeof actions[number];

export type Permission = `${Resource}:${Action}`;