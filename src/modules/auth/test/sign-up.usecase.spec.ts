import { BadRequestException } from '@nestjs/common';

import { UserEntity } from '../entity/user.entity';
import { InMemoryUserRepository } from '../repo/in-memory-user.repository';
import { SignUpUseCase } from '../usecase/sign-up.usecase';
import { GenerateHashUseCase } from '../../security/usecase/generate-hash.usecase';

class GenerateHashUseCaseStub {
  async execute({ value }: { value: string }): Promise<string> {
    return `hashed:${value}`;
  }
}

describe('SignUpUseCase', () => {
  let userRepository: InMemoryUserRepository;
  let generateHashUseCase: GenerateHashUseCaseStub;
  let useCase: SignUpUseCase;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    generateHashUseCase = new GenerateHashUseCaseStub();
    useCase = new SignUpUseCase(
      userRepository,
      generateHashUseCase as GenerateHashUseCase,
    );
  });

  it('should sign up successfully', async () => {
    const result = await useCase.execute({
      name: 'John Doe',
      email: 'John@Email.com',
      password: '123456',
    });

    expect(result.accessToken).toBeUndefined();
    expect(result.refreshToken).toBeUndefined();
    expect(result.user.name).toBe('John Doe');
    expect(result.user.email).toBe('john@email.com');
    expect(result.user.role).toBe('admin');
    const savedUser = await userRepository.findByEmail('john@email.com');
    expect(savedUser).not.toBeNull();
    expect(savedUser?.passwordHash).toBe('hashed:123456');
    expect(savedUser?.role).toBe('admin');
  });

  it('should throw when email is already in use', async () => {
    await userRepository.create(
      UserEntity.create({
        id: 'user-1',
        name: 'Existing User',
        email: 'existing@email.com',
        role: 'admin',
        passwordHash: 'hashed:123456',
        createdAt: new Date(),
      }),
    );

    await expect(
      useCase.execute({
        name: 'Another User',
        email: 'existing@email.com',
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
