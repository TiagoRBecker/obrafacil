import {
  Controller,
  Post,
  Body,
  Req,
} from '@nestjs/common';
import { CreateInstanceNameUseCase } from '../usecase/create-instance-usecase';

@Controller('instance')
export class CreateInstanceController {
  constructor(
    private readonly createInstanceUseCase: CreateInstanceNameUseCase,
  ) {}

  @Post('create')
  create(@Req() req: any, @Body() body: { instanceName: string }) {
    return this.createInstanceUseCase.execute(body.instanceName);
  }
}
