import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryInterface {
  private readonly users = new Map<string, UserEntity>();

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.users.get(email.toLowerCase()) ?? null;
  }
  async findById(email: string): Promise<UserEntity | null> {
    return this.users.get(email.toLowerCase()) ?? null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    this.users.set(user.email.toLowerCase(), user);
    return user;
  }
  async insertSettingsUser(settinsId: string, userId: string): Promise<void> {
    throw ""
  }
}
