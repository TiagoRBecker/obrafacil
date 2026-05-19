import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';

import { CreateTeamMemberDto } from './dto/create-team-member.dto';
import { DeleteTeamMemberResponseDto } from './dto/delete-team-member-response.dto';
import { TeamMemberIdParamDto } from './dto/team-member-id-param.dto';
import { TeamMemberResponseDto } from './dto/team-member-response.dto';
import { UpdateTeamMemberDto } from './dto/update-team-member.dto';
import { TeamService } from './team.service';

@Controller('admin/team')

export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create')
  create(@Body() body: CreateTeamMemberDto): Promise<TeamMemberResponseDto> {
  
    return this.teamService.create(body);
  }

  @Patch('update/:id')
  update(
    @Param() params: TeamMemberIdParamDto,
    @Body() body: UpdateTeamMemberDto,
  ): Promise<TeamMemberResponseDto> {
    
    return this.teamService.update(params.id, body);
  }

  @Delete('delete/:id')
  delete(
    @Param() params: TeamMemberIdParamDto,
  ): Promise<DeleteTeamMemberResponseDto> {
    return this.teamService.delete(params.id);
  }

  @Get('all')
  findAll(): Promise<TeamMemberResponseDto[]> {
    return this.teamService.findAll();
  }

  @Get(':id')
  findById(@Param() params: TeamMemberIdParamDto): Promise<TeamMemberResponseDto> {
    return this.teamService.findById(params.id);
  }
}
