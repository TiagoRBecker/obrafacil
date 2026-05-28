import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../src/modules/users/entity/user.entity';
import { UserRepositoryInterface } from '../../src/modules/users/repo/user.repository.interface';

@Injectable()
export class MockUserRepository implements UserRepositoryInterface {
  protected readonly users = new Map<string, UserEntity>([
    [
      'admin-id',
      UserEntity.toDto({
        id: 'admin-id',
        name: 'Admin Test',
        email: 'admin@test.com',
        role: 'admin',
        passwordHash: '',
        permission: [
          'order:create', 'order:read', 'order:update', 'order:delete',
          'customer:create', 'customer:read', 'customer:update', 'customer:delete',
          'team:create', 'team:read', 'team:update',
          'settings:create', 'settings:read', 'settings:update',
        ],
      }),
    ],
    [
      'user-id',
      UserEntity.toDto({
        id: 'user-id',
        name: 'User Test',
        email: 'user@test.com',
        role: 'user',
        passwordHash: '',
        permission: ['order:read', 'customer:read', 'team:read', 'settings:read'],
      }),
    ],
  ]);

  updatePasswordHash(email: string, hash: string): void {
    for (const [id, user] of this.users) {
      if (user.email === email.toLowerCase()) {
        const updated = UserEntity.toDto({
          id: user.id as string,
          name: user.name,
          email: user.email,
          role: user.role,
          passwordHash: hash,
          permission: user.permission,
        });
        this.users.set(id, updated);
        return;
      }
    }
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    for (const user of this.users.values()) {
      if (user.email === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    return this.users.get(id) ?? null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const id = user.id || 'new-user-id';
    const created = UserEntity.toDto({
      id,
      name: user.name,
      email: user.email,
      role: user.role,
      passwordHash: user.passwordHash,
      permission: user.permission,
    });
    this.users.set(id, created);
    return created;
  }
}
