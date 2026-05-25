import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Verificar status da API',
    description: 'Endpoint de saúde que confirma se a API está online e funcionando.',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
