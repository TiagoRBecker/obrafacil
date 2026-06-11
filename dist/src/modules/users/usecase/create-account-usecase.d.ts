import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { GenerateHashUseCase } from '../../security/usecase/generate-hash.usecase';
import { SignUpDto } from '../dto/sign-up.dto';
export declare class CreateAccountUseCase {
    private readonly userRepository;
    private readonly generateHashUseCase;
    private readonly logger;
    constructor(userRepository: UserRepositoryInterface, generateHashUseCase: GenerateHashUseCase);
    execute(input: SignUpDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
    }>;
}
