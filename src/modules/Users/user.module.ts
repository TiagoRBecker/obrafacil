import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { PrismaService } from '../../db/prisma';
import { UserRepositoryInterface } from './repo/user.repository.interface';
import { InMemoryUserRepository } from './repo/in-memory-user.repository';
import { UserRepo } from './repo/user.repo';
import { CreateAccountUseCase } from './usecase/create-account-usecase';
import { FindUserByEmailUsecase } from './usecase/find-user-id-usecase';

@Module({
  imports: [SecurityModule],

  providers: [
    {
      provide: UserRepositoryInterface,
      useClass: UserRepo,
    },
    PrismaService,
    CreateAccountUseCase,
    InMemoryUserRepository,
    FindUserByEmailUsecase,
  ],
  exports: [
    UserRepositoryInterface,
    CreateAccountUseCase,
    FindUserByEmailUsecase,
  ],
})
export class UserModule {}
