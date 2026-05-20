import { GenerateAccessTokenUseCase } from '../../security/usecase/generate-access-token.usecase';
import { GenerateRefreshTokenUseCase } from '../../security/usecase/generate-refresh-token.usecase';
import { FindUserByEmailUsecase } from '../../Users/usecase/find-user-id-usecase';
import { SignInDto } from '../../Users/dto/sign-in.dto';
import { AuthResponseDto } from '../../Users/dto/auth-response.dto';
export declare class SignInUseCase {
    private readonly findByUser;
    private readonly generateAccessTokenUseCase;
    private readonly generateRefreshTokenUseCase;
    private readonly logger;
    constructor(findByUser: FindUserByEmailUsecase, generateAccessTokenUseCase: GenerateAccessTokenUseCase, generateRefreshTokenUseCase: GenerateRefreshTokenUseCase);
    execute(input: SignInDto): Promise<AuthResponseDto>;
}
