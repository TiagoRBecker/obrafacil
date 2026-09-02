import { BadRequestException } from '@nestjs/common';
import { CreateAccountUseCase } from './create-account-usecase';
import { GenerateHashUseCase } from '../../security/usecase/generate-hash.usecase';
import { InMemoryUserRepository } from '../repo/in-memory-user.repository';

describe('CreateAccountUseCase', () => {
  let usecase: CreateAccountUseCase;
  let repository: InMemoryUserRepository;
  let generateHashUseCase: { execute: jest.Mock };

  beforeEach(() => {
    repository = new InMemoryUserRepository();
    generateHashUseCase = { execute: jest.fn() };
    usecase = new CreateAccountUseCase(
      repository,
      generateHashUseCase as unknown as GenerateHashUseCase,
    );
  });

  describe('execute', () => {
    it('have to create a new account when email is not in use', async () => {
      generateHashUseCase.execute.mockResolvedValue('hashed-password');

      const result = await usecase.execute({
        name: 'João Silva',
        email: 'Joao@Example.com',
        password: 'senha123',
        role: 'USER' as any,
      });

      expect(generateHashUseCase.execute).toHaveBeenCalledWith({
        value: 'senha123',
      });
      expect(result.user.email).toBe('joao@example.com');
      expect(result.user.name).toBe('João Silva');
      expect(result.user.role).toBe('USER');
    });

    it('have to throw BadRequestException when email already exists', async () => {
      await usecase.execute({
        name: 'Primeiro',
        email: 'duplicado@example.com',
        password: 'senha123',
        role: 'USER' as any,
      });

      await expect(
        usecase.execute({
          name: 'Segundo',
          email: 'duplicado@example.com',
          password: 'outra123',
          role: 'ADMIN' as any,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('have to throw BadRequestException when email exists with different case', async () => {
      await usecase.execute({
        name: 'Primeiro',
        email: 'Case@Test.com',
        password: 'senha123',
        role: 'USER' as any,
      });

      await expect(
        usecase.execute({
          name: 'Segundo',
          email: 'case@test.com',
          password: 'outra123',
          role: 'ADMIN' as any,
        }),
      ).rejects.toThrow('Email is already in use.');
    });
  });
});
