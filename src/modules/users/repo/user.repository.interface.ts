import { UserEntity } from '../entity/user.entity';

export abstract class UserRepositoryInterface {
  abstract findByEmail(email: string): Promise<UserEntity | null>;
   abstract findById(id: string): Promise<UserEntity | null>;
  abstract create(user: UserEntity): Promise<UserEntity>;
  
}
