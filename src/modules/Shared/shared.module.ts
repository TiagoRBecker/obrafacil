import { Module } from '@nestjs/common';
import { PrismaService } from '../../db/prisma';
import { SettingsRepositoryInterface } from '../settings/repo/settings.repository';
import { SettingsRepo } from '../settings/repo/settings-repo';
import { UserRepositoryInterface } from '../users/repo/user.repository.interface';
import { UserRepo } from '../users/repo/user.repo';

@Module({
  providers: [
    PrismaService,
    {
      provide: SettingsRepositoryInterface,
      useClass: SettingsRepo,
    },
  ],
  exports: [PrismaService, SettingsRepositoryInterface],
})
export class SharedModule {}
