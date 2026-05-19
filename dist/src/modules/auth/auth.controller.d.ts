import { AccessTokenResponseDto } from '../security/dto/access-token-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInUseCase } from './usecase/sign-in.usecase';
import { SignUpUseCase } from './usecase/sign-up.usecase';
import { RefreshTokenUseCase } from './usecase/refresh-token.usecase';
export declare class AuthController {
    private readonly signinUseCase;
    private readonly signUpUseCase;
    private readonly refreshTokenUseCase;
    constructor(signinUseCase: SignInUseCase, signUpUseCase: SignUpUseCase, refreshTokenUseCase: RefreshTokenUseCase);
    signUp(body: SignUpDto): Promise<AuthResponseDto>;
    signIn(body: SignInDto): Promise<AuthResponseDto>;
    refreshToken(body: RefreshTokenDto): AccessTokenResponseDto;
}
