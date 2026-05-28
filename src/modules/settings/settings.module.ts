import { Module } from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { MockSettingsRepository } from './repo/mock-settings.repository';
import { SettingsRepositoryInterface } from './repo/settings.repository';
import { SettingsController } from './controllers';
import { UpsertSettingsUseCase } from './usecase/upsert-settings.usecase';
import { FindSettingsByIdUseCase } from './usecase/find-settings-by-id.usecase';
import { SettingsRepo } from './repo/settings-repo';
import { PrismaService } from '../../db/prisma';
import { UserModule } from '../users/user.module';

@Module({
  controllers: [...SettingsController],
  imports: [UserModule],
  providers: [
    UpsertSettingsUseCase,
    FindSettingsByIdUseCase,
    AdminTokenGuard,
    MockSettingsRepository,
    PrismaService,
    {
      provide: SettingsRepositoryInterface,
      useClass: SettingsRepo,
    },
  ],
})
export class SettingsModule {}
