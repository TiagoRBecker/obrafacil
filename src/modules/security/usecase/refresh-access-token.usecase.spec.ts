import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { RefreshAccessTokenUseCase } from './refresh-access-token.usecase';

describe('RefreshAccessTokenUseCase', () => {
  let usecase: RefreshAccessTokenUseCase;
  let jwtService: { verify: jest.Mock; sign: jest.Mock };
  let configService: { get: jest.Mock };

  const securityConfig = {
    jwtRefreshSecret: 'refresh-secret',
    jwtAccessExpiresIn: '55m',
  };

  beforeEach(() => {
    jwtService = { verify: jest.fn(), sign: jest.fn() };
    configService = { get: jest.fn() };
    configService.get.mockReturnValue(securityConfig);
    usecase = new RefreshAccessTokenUseCase(
      jwtService as unknown as JwtService,
      configService as unknown as ConfigService,
    );
  });

  describe('execute', () => {
    it('have to issue new access token when refresh token is valid', () => {
      jwtService.verify.mockReturnValue({
        id: 'user-1',
        name: 'João',
        role: 'admin',
      });
      jwtService.sign.mockReturnValue('new-access-token');

      const result = usecase.execute({ refreshToken: 'valid-refresh-token' });

      expect(jwtService.verify).toHaveBeenCalledWith('valid-refresh-token', {
        secret: 'refresh-secret',
      });
      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: 'user-1', name: 'João', role: 'admin' },
        { expiresIn: '55m' },
      );
      expect(result.accessToken).toBe('new-access-token');
    });

    it('have to throw Unauthorized when refresh token is invalid', () => {
      jwtService.verify.mockImplementation(() => {
        throw new Error('invalid token');
      });

      expect(() =>
        usecase.execute({ refreshToken: 'expired-token' }),
      ).toThrow(UnauthorizedException);
    });

    it('have to throw Unauthorized when payload is missing required fields', () => {
      jwtService.verify.mockReturnValue({ id: 'user-1' });

      expect(() =>
        usecase.execute({ refreshToken: 'valid-token' }),
      ).toThrow(UnauthorizedException);
    });

    it('have to respect input overrides', () => {
      jwtService.verify.mockReturnValue({
        id: 'user-1',
        name: 'João',
        role: 'admin',
      });
      jwtService.sign.mockReturnValue('new-access-token');

      usecase.execute({
        refreshToken: 'valid-token',
        refreshSecret: 'custom-refresh',
        accessExpiresIn: '10m',
      });

      expect(jwtService.verify).toHaveBeenCalledWith('valid-token', {
        secret: 'custom-refresh',
      });
      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: 'user-1', name: 'João', role: 'admin' },
        { expiresIn: '10m' },
      );
    });
  });
});
