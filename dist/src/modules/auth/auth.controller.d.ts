import { AccessTokenResponseDto } from '../security/dto/access-token-response.dto';
import { SignInUseCase } from './usecase/sign-in.usecase';
import { SignUpUseCase } from './usecase/sign-up.usecase';
import { RefreshTokenUseCase } from './usecase/refresh-token.usecase';
import { SignUpDto } from '../Users/dto/sign-up.dto';
import { AuthResponseDto } from '../Users/dto/auth-response.dto';
import { SignInDto } from '../Users/dto/sign-in.dto';
export declare class AuthController {
    private readonly signinUseCase;
    private readonly signUpUseCase;
    private readonly refreshTokenUseCase;
    constructor(signinUseCase: SignInUseCase, signUpUseCase: SignUpUseCase, refreshTokenUseCase: RefreshTokenUseCase);
    signUp(body: SignUpDto): Promise<AuthResponseDto>;
    signIn(body: SignInDto): Promise<AuthResponseDto>;
    refreshToken(body: any): AccessTokenResponseDto;
}
