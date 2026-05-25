import { Body, Controller, Post } from '@nestjs/common';
import { RefreshTokenUseCase } from '../usecase/refresh-token.usecase';
import { AccessTokenResponseDto } from '../../security/dto/access-token-response.dto';



@Controller('auth')
export class RefreshTokenController {
  constructor(
  
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}



  @Post('refreshtoken')
  refreshToken(@Body() body): AccessTokenResponseDto {
    return this.refreshTokenUseCase.execute(body);
  }
}
