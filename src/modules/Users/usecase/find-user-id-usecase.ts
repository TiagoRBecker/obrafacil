import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { CompareHashUseCase } from '../../security/usecase/compare-hash.usecase';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class FindUserByEmailUsecase {
  private readonly logger = new Logger(FindUserByEmailUsecase.name);

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly compareHashUseCase: CompareHashUseCase,
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

    this.logger.log(`Login bem-sucedido - usuário: ${user.email}`);
    return {
      user: {
        id: user.id as string,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
