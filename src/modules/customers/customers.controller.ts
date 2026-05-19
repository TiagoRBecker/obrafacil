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
import { CreateCustomerDto } from './dto/create-customer.dto';
import { CustomerIdParamDto } from './dto/customer-id-param.dto';
import { CustomerResponseDto } from './dto/customer-response.dto';
import { DeleteCustomerResponseDto } from './dto/delete-customer-response.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomersService } from './customers.service';
import { RequirePermissions, Roles } from '../../../decorators';
import { UserRole } from '../../../decorators/types';
@UseGuards(AdminTokenGuard)
@Controller('admin/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('create')
  @Roles(UserRole.ADMIN)
  @RequirePermissions("customer:create")
  create(@Body() body: CreateCustomerDto): Promise<CustomerResponseDto> {
    return this.customersService.create(body);
  }
@Roles(UserRole.ADMIN)
  @RequirePermissions("customer:update")
  @Patch('update/:id')
  update(
    @Param() params: CustomerIdParamDto,
    @Body() body: UpdateCustomerDto,
  ): Promise<CustomerResponseDto> {
    return this.customersService.update(params.id, body);
  }
@Roles(UserRole.ADMIN)
  @RequirePermissions("customer:update")
  @Delete('delete/:id')
  delete(
    @Param() params: CustomerIdParamDto,
  ): Promise<DeleteCustomerResponseDto> {

    return this.customersService.delete(params.id);
  }
@Roles(UserRole.ADMIN,UserRole.USER)
  @RequirePermissions("customer:read")
  @Get('all')
  findAll(): Promise<CustomerResponseDto[]> {
    return this.customersService.findAll();
  }
@Roles(UserRole.ADMIN,UserRole.USER)
  @RequirePermissions("customer:read")
  @Get(':id')
  findById(@Param() params: CustomerIdParamDto): Promise<CustomerResponseDto> {
    return this.customersService.findById(params.id);
  }
}
