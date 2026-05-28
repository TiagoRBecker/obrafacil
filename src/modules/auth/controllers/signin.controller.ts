import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SignInDto } from '../../users/dto/sign-in.dto';
import { AuthResponseDto } from '../../users/dto/auth-response.dto';
import { SignInUseCase } from '../usecase/sign-in.usecase';

@ApiTags('Autenticação')
@Controller('auth')
export class SignInController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
  ) {}


  @Post('signin')
  @ApiOperation({
    summary: 'Autenticar usuário',
    description: 'Realiza o login com email e senha. Retorna um token de acesso JWT e refresh token para acessar os demais endpoints protegidos.',
  })
  @ApiBody({ type: SignInDto, description: 'Credenciais do usuário (email e senha)' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso. Retorna tokens de acesso e dados do usuário.', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Email ou senha inválidos.' })
  signIn(@Body() body: SignInDto): Promise<AuthResponseDto> {
    return this.signInUseCase.execute(body);
  }

}
