import { UnauthorizedException } from '@nestjs/common';
import { FindUserByEmailUsecase } from './find-user-id-usecase';
import { CompareHashUseCase } from '../../security/usecase/compare-hash.usecase';
import { InMemoryUserRepository } from '../repo/in-memory-user.repository';

describe('FindUserByEmailUsecase', () => {
  let usecase: FindUserByEmailUsecase;
  let repository: InMemoryUserRepository;
  let compareHashUseCase: { execute: jest.Mock };

  const user = {
    id: 'user-1',
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'USER',
    passwordHash: 'hashed-password',
  };

  beforeEach(() => {
    repository = new InMemoryUserRepository({ 'joao@example.com': user });
    compareHashUseCase = { execute: jest.fn() };
    usecase = new FindUserByEmailUsecase(
      repository,
      compareHashUseCase as unknown as CompareHashUseCase,
    );
  });

  describe('execute', () => {
    it('have to return user when credentials are valid', async () => {
      compareHashUseCase.execute.mockResolvedValue({ matches: true });

      const result = await usecase.execute({
        email: 'joao@example.com',
        password: 'senha123',
      });

      expect(result.user.id).toBe('user-1');
      expect(result.user.email).toBe('joao@example.com');
      expect(result.user.role).toBe('USER');
      expect(result.user).toHaveProperty('companyName');
      expect(result.user).toHaveProperty('specialty');
      expect(result.user).toHaveProperty('logoUrl');
    });

    it('have to throw Unauthorized when user does not exist', async () => {
      await expect(
        usecase.execute({ email: 'nao-existe@example.com', password: 'senha123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('have to throw Unauthorized when password does not match', async () => {
      compareHashUseCase.execute.mockResolvedValue({ matches: false });

      await expect(
        usecase.execute({ email: 'joao@example.com', password: 'senha-errada' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
