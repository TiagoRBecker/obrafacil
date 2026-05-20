import { Body, Controller, Post } from '@nestjs/common';

import { AccessTokenResponseDto } from '../security/dto/access-token-response.dto';
import { SignInUseCase } from './usecase/sign-in.usecase';
import { SignUpUseCase } from './usecase/sign-up.usecase';
import { RefreshTokenUseCase } from './usecase/refresh-token.usecase';
import { SignUpDto } from '../Users/dto/sign-up.dto';
import { AuthResponseDto } from '../Users/dto/auth-response.dto';
import { SignInDto } from '../Users/dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly signinUseCase: SignInUseCase,
    private readonly signUpUseCase: SignUpUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('signup')
  signUp(@Body() body: SignUpDto): Promise<AuthResponseDto> {
    return this.signUpUseCase.execute(body);
  }

  @Post('signin')
  signIn(@Body() body: SignInDto): Promise<AuthResponseDto> {
  
    return this.signinUseCase.execute(body);
  }

  @Post('refreshtoken')
  refreshToken(@Body() body): AccessTokenResponseDto {
    return this.refreshTokenUseCase.execute(body);
  }
}
