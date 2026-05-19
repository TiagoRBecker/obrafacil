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

import { CreateOrderDto } from './dto/create-budget.dto';
import { BudgetIdParamDto } from './dto/budget-id-param.dto';
import { DeleteBudgetResponseDto } from './dto/delete-budget-response.dto';

import { BudgetsService } from './budgets.service';
import { BudgetEntity } from './entity/budget.entity';
import { AdminTokenGuard } from '../../guards/admin-token.guard';
import { RequirePermissions, Roles } from '../../../decorators';
import { UserRole } from '../../../decorators/types';

@UseGuards(AdminTokenGuard)
@Controller('admin/budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:create')
  create(@Body() body: CreateOrderDto): Promise<BudgetEntity> {
    return this.budgetsService.create(body);
  }
  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:update')
  @Patch('update/:id')
  update(
    @Param() params: BudgetIdParamDto,
    @Body() body: CreateOrderDto,
  ): Promise<BudgetEntity> {
    return this.budgetsService.update(params.id, body);
  }
  @Roles(UserRole.ADMIN)
  @RequirePermissions('order:delete')
  @Delete('delete/:id')
  delete(@Param() params: BudgetIdParamDto): Promise<DeleteBudgetResponseDto> {
    return this.budgetsService.delete(params.id);
  }
  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get('all')
  findAll(): Promise<BudgetEntity[]> {
    return this.budgetsService.findAll();
  }
  @Roles(UserRole.ADMIN, UserRole.USER)
  @RequirePermissions('order:read')
  @Get(':id')
  findById(@Param() params: BudgetIdParamDto): Promise<BudgetEntity> {
    return this.budgetsService.findById(params.id);
  }
}
