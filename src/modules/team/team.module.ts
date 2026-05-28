import { Module } from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { MockTeamMemberRepository } from './repo/mock-team-member.repository';
import { TeamMemberRepositoryInterface } from './repo/team-member.repository';
import { TeamController } from './controllers';
import { TeamService } from './team.service';
import { CreateTeamMemberUseCase } from './usecase/create-team-member.usecase';
import { DeleteTeamMemberUseCase } from './usecase/delete-team-member.usecase';
import { FindAllTeamMembersUseCase } from './usecase/find-all-team-members.usecase';
import { FindTeamMemberByIdUseCase } from './usecase/find-team-member-by-id.usecase';
import { UpdateTeamMemberUseCase } from './usecase/update-team-member.usecase';
import { TeamRepo } from './repo/team-repo';
import { PrismaService } from '../../db/prisma';
import { UserModule } from '../users/user.module';

@Module({
  controllers: [...TeamController],
   imports: [UserModule],
  providers: [
    TeamService,
    CreateTeamMemberUseCase,
    UpdateTeamMemberUseCase,
    FindTeamMemberByIdUseCase,
    FindAllTeamMembersUseCase,
    DeleteTeamMemberUseCase,
    PrismaService,
    AdminTokenGuard,
    MockTeamMemberRepository,
    {
      provide: TeamMemberRepositoryInterface,
      useClass: TeamRepo,
    },
  ],
})
export class TeamModule {}
