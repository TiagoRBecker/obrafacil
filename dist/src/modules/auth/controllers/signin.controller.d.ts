import { SignInUseCase } from '../usecase/sign-in.usecase';
import { SignInDto } from '../../users/dto/sign-in.dto';
import { AuthResponseDto } from '../../users/dto/auth-response.dto';
export declare class SignInController {
    private readonly signInUseCase;
    constructor(signInUseCase: SignInUseCase);
    signIn(body: SignInDto): Promise<AuthResponseDto>;
}
