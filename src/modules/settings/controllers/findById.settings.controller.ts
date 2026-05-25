import {
  Controller,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AdminTokenGuard } from '../../../guards/admin-token.guard';
import { SettingsResponseDto } from '../dto/settings-response.dto';
import { FindSettingsByIdUseCase } from '../usecase/find-settings-by-id.usecase';
import { RequirePermissions } from '../../../../decorators';

@Controller('admin/settings')
@UseGuards(AdminTokenGuard)
export class FindByIdSettingsController {
  constructor(private readonly findSettingsByIdUseCase: FindSettingsByIdUseCase) {}

  @RequirePermissions('settings:read')
  @Get('/me')
  findById(@Req() req): Promise<SettingsResponseDto> {
    const userId = req.user;
    return this.findSettingsByIdUseCase.execute(userId);
  }
}
