import { Module } from '@nestjs/common';
import { SecurityModule } from '../security/security.module';
import { PrismaService } from '../../db/prisma';
import { UserRepositoryInterface } from './repo/user.repository.interface';
import { InMemoryUserRepository } from './repo/in-memory-user.repository';
import { UserRepo } from './repo/user.repo';
import { CreateAccountUseCase } from './usecase/create-account-usecase';
import { FindUserByEmailUsecase } from './usecase/find-user-id-usecase';
import { SettingsModule } from '../settings/settings.module';
import { SharedModule } from '../Shared/shared.module';

@Module({
  imports: [SecurityModule,SharedModule],

  providers: [
    {
      provide: UserRepositoryInterface,
      useClass: UserRepo,
    },
    PrismaService,
    CreateAccountUseCase,
    FindUserByEmailUsecase,
  ],
  exports: [
    UserRepositoryInterface,
    CreateAccountUseCase,
    FindUserByEmailUsecase,
  ],
})
export class UserModule {}
