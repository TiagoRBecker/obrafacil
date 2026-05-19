import { UnauthorizedException } from '@nestjs/common';

import { UserEntity } from '../entity/user.entity';
import { InMemoryUserRepository } from '../repo/in-memory-user.repository';
import { SignInUseCase } from '../usecase/sign-in.usecase';
import { CompareHashUseCase } from '../../security/usecase/compare-hash.usecase';
import { GenerateAccessTokenUseCase } from '../../security/usecase/generate-access-token.usecase';
import { GenerateRefreshTokenUseCase } from '../../security/usecase/generate-refresh-token.usecase';

class CompareHashUseCaseStub {
  async execute({
    value,
    hash,
  }: {
    value: string;
    hash: string;
  }): Promise<{ matches: boolean }> {
    return {
      matches: hash === `hashed:${value}`,
    };
  }
}

class GenerateAccessTokenUseCaseStub {
  execute({
    id,
  }: {
    id: string;
  }): { accessToken: string } {
    return { accessToken: `access:${id}` };
  }
}

class GenerateRefreshTokenUseCaseStub {
  execute({
    id,
  }: {
    id: string;
  }): { refreshToken: string } {
    return { refreshToken: `refresh:${id}` };
  }
}

describe('SignInUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let compareHashUseCase: CompareHashUseCaseStub;
  let generateAccessTokenUseCase: GenerateAccessTokenUseCaseStub;
  let generateRefreshTokenUseCase: GenerateRefreshTokenUseCaseStub;
  let useCase: SignInUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    compareHashUseCase = new CompareHashUseCaseStub();
    generateAccessTokenUseCase = new GenerateAccessTokenUseCaseStub();
    generateRefreshTokenUseCase = new GenerateRefreshTokenUseCaseStub();
    useCase = new SignInUseCase(
      userRepository,
      compareHashUseCase as CompareHashUseCase,
      generateAccessTokenUseCase as GenerateAccessTokenUseCase,
      generateRefreshTokenUseCase as GenerateRefreshTokenUseCase,
    );
  });

  it('should sign in successfully', async () => {
    await userRepository.create(
      UserEntity.create({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@email.com',
        role: 'admin',
        passwordHash: 'hashed:123456',
        createdAt: new Date(),
      }),
    );

    const result = await useCase.execute({
      email: 'john@email.com',
      password: '123456',
    });

    expect(result.accessToken).toBe('access:user-1');
    expect(result.refreshToken).toBe('refresh:user-1');
    expect(result.user).toEqual({
      id: 'user-1',
      name: 'John Doe',
      email: 'john@email.com',
      role: 'admin',
    });
  });

  it('should throw when user is not found', async () => {
    await expect(
      useCase.execute({
        email: 'missing@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should throw when password is invalid', async () => {
    await userRepository.create(
      UserEntity.create({
        id: 'user-1',
        name: 'John Doe',
        email: 'john@email.com',
        role: 'admin',
        passwordHash: 'hashed:123456',
        createdAt: new Date(),
      }),
    );

    await expect(
      useCase.execute({
        email: 'john@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
