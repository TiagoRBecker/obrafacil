import { Injectable } from '@nestjs/common';

import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from './user.repository.interface';
import { UserWithContextDto } from './mapper.user.repo';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryInterface {
  private readonly data = new Map<string, UserWithContextDto>();

  constructor(seed?: Record<string, UserWithContextDto>) {
    if (seed) {
      for (const [key, value] of Object.entries(seed)) {
        this.data.set(key.toLowerCase(), value);
      }
    }
  }

  async findByEmail(email: string): Promise<UserWithContextDto | null> {
    return this.data.get(email.toLowerCase()) ?? null;
  }

  async findById(id: string): Promise<UserWithContextDto | null> {
    for (const user of this.data.values()) {
      if (user.id === id) return user;
    }
    return null;
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
