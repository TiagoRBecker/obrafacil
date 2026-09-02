import { Module } from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { SettingsRepositoryInterface } from './repo/settings.repository';
import { SettingsController } from './controllers';
import { UpsertSettingsUseCase } from './usecase/upsert-settings.usecase';
import { FindSettingsByIdUseCase } from './usecase/find-settings-by-id.usecase';
import { SettingsRepo } from './repo/settings-repo';
import { PrismaService } from '../../db/prisma';
import { UserModule } from '../users/user.module';
import { CreatetSettingsUseCase } from './usecase/create-settings-usecase';

@Module({
  controllers: [...SettingsController],
  imports: [UserModule],
  providers: [
    UpsertSettingsUseCase,
    FindSettingsByIdUseCase,
    AdminTokenGuard,
    CreatetSettingsUseCase,
    PrismaService,
    {
      provide: SettingsRepositoryInterface,
      useClass: SettingsRepo,
    },
  ],
  exports:[FindSettingsByIdUseCase]
})
export class SettingsModule {}
