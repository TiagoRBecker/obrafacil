import { Module } from '@nestjs/common';
import { MetricsControllers } from './controllers';
import { GetMetricsUseCase } from './usecase/get-metrics.usecase';
import { MetricsRepositoryInterface } from './repo/metrics-repository.interface';
import { MetricsRepo } from './repo/metrics.repo';
import { PrismaService } from '../../db/prisma';
import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { UserModule } from '../users/user.module';

@Module({
  controllers: [...MetricsControllers],
  imports: [UserModule],
  providers: [
    GetMetricsUseCase,
    AdminTokenGuard,
    PrismaService,
    {
      provide: MetricsRepositoryInterface,
      useClass: MetricsRepo,
    },
  ],
})
export class MetricsModule {}
