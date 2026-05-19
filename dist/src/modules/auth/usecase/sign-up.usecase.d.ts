import { AuthResponseDto } from '../dto/auth-response.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { GenerateHashUseCase } from '../../security/usecase/generate-hash.usecase';
export declare class SignUpUseCase {
    private readonly userRepository;
    private readonly generateHashUseCase;
    private readonly logger;
    constructor(userRepository: UserRepositoryInterface, generateHashUseCase: GenerateHashUseCase);
    execute(input: SignUpDto): Promise<AuthResponseDto>;
}
