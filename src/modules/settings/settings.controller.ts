import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { SettingsIdParamDto } from './dto/settings-id-param.dto';
import { SettingsResponseDto } from './dto/settings-response.dto';
import { UpsertSettingsDto } from './dto/upsert-settings.dto';
import { SettingsService } from './settings.service';
import { RequirePermissions } from '../../../decorators';

@Controller('admin/settings')
@UseGuards(AdminTokenGuard)

export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
@RequirePermissions('order:create')
  @Post('create')
  create(@Req() req,@Body() body: UpsertSettingsDto): Promise<SettingsResponseDto> {
    const userId = req.user
    return this.settingsService.create(body, userId);
  }

  @Patch('update/:id')
  update(
    @Param() params: SettingsIdParamDto,
    @Body() body: UpsertSettingsDto,
  ): Promise<SettingsResponseDto> {
    return this.settingsService.update(params.id, body);
  }
@RequirePermissions('settings:read')
  @Get('/me')
  findById(@Req() req ): Promise<SettingsResponseDto> {
    const userId = req.user
    return this.settingsService.findById(userId);
  }
}
