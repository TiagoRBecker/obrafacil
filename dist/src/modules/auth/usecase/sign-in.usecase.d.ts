import { AuthResponseDto } from '../dto/auth-response.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { CompareHashUseCase } from '../../security/usecase/compare-hash.usecase';
import { GenerateAccessTokenUseCase } from '../../security/usecase/generate-access-token.usecase';
import { GenerateRefreshTokenUseCase } from '../../security/usecase/generate-refresh-token.usecase';
export declare class SignInUseCase {
    private readonly userRepository;
    private readonly compareHashUseCase;
    private readonly generateAccessTokenUseCase;
    private readonly generateRefreshTokenUseCase;
    private readonly logger;
    constructor(userRepository: UserRepositoryInterface, compareHashUseCase: CompareHashUseCase, generateAccessTokenUseCase: GenerateAccessTokenUseCase, generateRefreshTokenUseCase: GenerateRefreshTokenUseCase);
    execute(input: SignInDto): Promise<AuthResponseDto>;
}
