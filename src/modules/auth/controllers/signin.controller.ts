import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from '../../Users/dto/sign-in.dto';
import { AuthResponseDto } from '../../Users/dto/auth-response.dto';
import { SignInUseCase } from '../usecase/sign-in.usecase';

@Controller('auth')
export class SignInController {
  constructor(
    private readonly signInUseCase: SignInUseCase,
  
  ) {}


  @Post('signin')
  signIn(@Body() body: SignInDto): Promise<AuthResponseDto> {
  
    return this.signInUseCase.execute(body);
  }

}
