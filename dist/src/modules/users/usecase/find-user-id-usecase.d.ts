import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { CompareHashUseCase } from '../../security/usecase/compare-hash.usecase';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { SettingsRepositoryInterface } from '../../settings/repo/settings.repository';
export declare class FindUserByEmailUsecase {
    private readonly userRepository;
    private readonly compareHashUseCase;
    private readonly settingsCompany;
    private readonly logger;
    constructor(userRepository: UserRepositoryInterface, compareHashUseCase: CompareHashUseCase, settingsCompany: SettingsRepositoryInterface);
    execute(input: SignInDto): Promise<AuthResponseDto>;
}
