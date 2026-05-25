import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RefreshTokenUseCase } from '../usecase/refresh-token.usecase';
import { AccessTokenResponseDto } from '../../security/dto/access-token-response.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class RefreshTokenController {
  constructor(
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}


  @Post('refreshtoken')
  @ApiOperation({
    summary: 'Renovar token de acesso',
    description: 'Utiliza o refresh token para obter um novo access token JWT. O refresh token é obtido no endpoint de login.',
  })
  @ApiBody({ schema: { type: 'object', properties: { refreshToken: { type: 'string', description: 'Refresh token recebido no login' } } } })
  @ApiResponse({ status: 201, description: 'Novo access token gerado com sucesso.', type: AccessTokenResponseDto })
  @ApiResponse({ status: 401, description: 'Refresh token inválido ou expirado.' })
  refreshToken(@Body() body): AccessTokenResponseDto {
    return this.refreshTokenUseCase.execute(body);
  }
}
