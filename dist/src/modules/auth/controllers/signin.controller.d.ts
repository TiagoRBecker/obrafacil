import { SignInDto } from '../../Users/dto/sign-in.dto';
import { AuthResponseDto } from '../../Users/dto/auth-response.dto';
import { SignInUseCase } from '../usecase/sign-in.usecase';
export declare class SignInController {
    private readonly signInUseCase;
    constructor(signInUseCase: SignInUseCase);
    signIn(body: SignInDto): Promise<AuthResponseDto>;
}
