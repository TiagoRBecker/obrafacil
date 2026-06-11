import { UserEntity } from '../entity/user.entity';
import { UserWithContextDto } from './mapper.user.repo';

export abstract class UserRepositoryInterface {
  abstract findByEmail(email: string): Promise<UserWithContextDto | null>;
   abstract findById(id: string): Promise<UserWithContextDto | null>;
  abstract create(user: UserEntity): Promise<UserEntity>;
  
}
