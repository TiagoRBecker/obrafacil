import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { CompareHashUseCase } from '../../security/usecase/compare-hash.usecase';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
export declare class FindUserByEmailUsecase {
    private readonly userRepository;
    private readonly compareHashUseCase;
    private readonly logger;
    constructor(userRepository: UserRepositoryInterface, compareHashUseCase: CompareHashUseCase);
    execute(input: SignInDto): Promise<AuthResponseDto>;
}
