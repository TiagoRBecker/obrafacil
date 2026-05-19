import { Module } from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { MockSettingsRepository } from './repo/mock-settings.repository';
import { SettingsRepositoryInterface } from './repo/settings.repository';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { CreateSettingsUseCase } from './usecase/create-settings.usecase';
import { FindSettingsByIdUseCase } from './usecase/find-settings-by-id.usecase';
import { UpdateSettingsUseCase } from './usecase/update-settings.usecase';
import { SettingsRepo } from './repo/settings-repo';
import { PrismaService } from '../../db/prisma';
import { AuthModule } from '../auth/auth.module';
import { UserRepositoryInterface } from '../auth/repo/user.repository.interface';
import { UserRepo } from '../auth/repo/user.repo';

@Module({
  controllers: [SettingsController],
  imports: [AuthModule],
  providers: [
    SettingsService,
    CreateSettingsUseCase,
    UpdateSettingsUseCase,
    FindSettingsByIdUseCase,
    AdminTokenGuard,
    MockSettingsRepository,
    PrismaService,
    {
      provide: SettingsRepositoryInterface,
      useClass: SettingsRepo,
    },
     {
      provide: UserRepositoryInterface, // <- adiciona isso
      useClass: UserRepo,
    },
  ],
})
export class SettingsModule {}
