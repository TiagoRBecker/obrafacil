import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { GenerateAccessTokenUseCase } from '../../security/usecase/generate-access-token.usecase';
import { GenerateRefreshTokenUseCase } from '../../security/usecase/generate-refresh-token.usecase';
import { FindUserByEmailUsecase } from '../../Users/usecase/find-user-id-usecase';
import { SignInDto } from '../../Users/dto/sign-in.dto';
import { AuthResponseDto } from '../../Users/dto/auth-response.dto';

@Injectable()
export class SignInUseCase {
  private readonly logger = new Logger(SignInUseCase.name);

  constructor(
    private readonly findByUser: FindUserByEmailUsecase,
    private readonly generateAccessTokenUseCase: GenerateAccessTokenUseCase,
    private readonly generateRefreshTokenUseCase: GenerateRefreshTokenUseCase,
  ) {}

  async execute(input: SignInDto): Promise<AuthResponseDto> {
    this.logger.log(`Tentativa de login para email: ${input.email}`);
    const { user } = await this.findByUser.execute(input);

    const { accessToken } = this.generateAccessTokenUseCase.execute({
      id: user?.id as string,
      name: user?.name,
      role: user.role,
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
      },
    };
  }
}
