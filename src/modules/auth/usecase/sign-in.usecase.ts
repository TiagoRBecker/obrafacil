import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { CompareHashUseCase } from '../../security/usecase/compare-hash.usecase';
import { GenerateAccessTokenUseCase } from '../../security/usecase/generate-access-token.usecase';
import { GenerateRefreshTokenUseCase } from '../../security/usecase/generate-refresh-token.usecase';

@Injectable()
export class SignInUseCase {
  private readonly logger = new Logger(SignInUseCase.name);

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly compareHashUseCase: CompareHashUseCase,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
  ) {}

  async execute(input: SignInDto): Promise<AuthResponseDto> {
    this.logger.log(`Tentativa de login para email: ${input.email}`);
    const user = await this.userRepository.findByEmail(input.email);
    

    if (!user?.email) {
      this.logger.error(`Usuário não encontrado - email: ${input.email}`);
      throw new UnauthorizedException('Email ou senha inválidas.');
    }

    const { matches } = await this.compareHashUseCase.execute({
      value: input.password,
      hash: user?.passwordHash as string,
    });

    if (!matches) {
      this.logger.error(
        `Falha na autenticação - senha incorreta para usuário: ${input.email}`,
      );
      throw new UnauthorizedException('Email ou senha inválidas.');
    }

    const { accessToken } = this.generateAccessTokenUseCase.execute({
      id: user?.id as string,
      name: user?.name,
      role: user.role,
      settingsId: user.settingsId as string | undefined,
    });

    const { refreshToken } = this.generateRefreshTokenUseCase.execute({
      id: user.id as string,
      name: user.name,
      role: user.role,
    });
  
    this.logger.log(`Login bem-sucedido - usuário: ${user.email}`);
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id as string,
        name: user.name,
        email: user.email,
        role: user.role,
        seettingsId: user.settingsId,
        seettings: {
          id: user?.settingsID as string,
          name: user.settingsName as string,
          logoUrl: user.settingslogoUrl as string,
          specialty: user.settingsspecialty as string,
        },
      },
    };
  }
}
