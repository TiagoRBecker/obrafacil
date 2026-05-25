import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import { GetConnectionUseCase } from '../usecase/findByConnection-usecase';

@Controller('instance')
export class GetConnectionWhatsAppController {
  constructor(
    private readonly connectionService: GetConnectionUseCase,
  ) {}

  @Get('/connection/:id/qrcode')
  connection(@Param ()  params:{id:string}) {
   
    return this.connectionService.execute(params.id);
  }
}
