import { GenerateHashUseCase } from '../../security/usecase/generate-hash.usecase';
import { SignUpDto } from '../../Users/dto/sign-up.dto';
import { CreateAccountUseCase } from '../../Users/usecase/create-account-usecase';
export declare class SignUpUseCase {
    private readonly createAccountUseCase;
    private readonly generateHashUseCase;
    private readonly logger;
    constructor(createAccountUseCase: CreateAccountUseCase, generateHashUseCase: GenerateHashUseCase);
    execute(input: SignUpDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
            permission: string[];
        };
    }>;
}
