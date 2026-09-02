import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateRefreshTokenUseCase } from './generate-refresh-token.usecase';

describe('GenerateRefreshTokenUseCase', () => {
  let usecase: GenerateRefreshTokenUseCase;
  let jwtService: { sign: jest.Mock };
  let configService: { get: jest.Mock };

  const securityConfig = {
    jwtRefreshSecret: 'refresh-secret',
    jwtRefreshExpiresIn: '15d',
  };

  beforeEach(() => {
    jwtService = { sign: jest.fn() };
    configService = { get: jest.fn() };
    configService.get.mockReturnValue(securityConfig);
    usecase = new GenerateRefreshTokenUseCase(
      jwtService as unknown as JwtService,
      configService as unknown as ConfigService,
    );
  });

  describe('execute', () => {
    it('have to sign refresh token with config secret and expiration', () => {
      jwtService.sign.mockReturnValue('refresh-token');

      const result = usecase.execute({ id: 'user-1', name: 'João', role: 'admin' });

      expect(configService.get).toHaveBeenCalledWith('security');
      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: 'user-1', name: 'João', role: 'admin' },
        { secret: 'refresh-secret', expiresIn: '15d' },
      );
      expect(result.refreshToken).toBe('refresh-token');
    });

    it('have to use input overrides when provided', () => {
      jwtService.sign.mockReturnValue('refresh-token');

      usecase.execute({
        id: 'user-1',
        name: 'João',
        role: 'member',
        secret: 'custom-secret',
        expiresIn: '30d',
      });

      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: 'user-1', name: 'João', role: 'member' },
        { secret: 'custom-secret', expiresIn: '30d' },
      );
    });

    it('have to fallback to defaults when config is missing', () => {
      configService.get.mockReturnValue(undefined);
      jwtService.sign.mockReturnValue('refresh-token');

      usecase.execute({ id: 'user-1', name: 'João', role: 'viewer' });

      expect(jwtService.sign).toHaveBeenCalledWith(
        { id: 'user-1', name: 'João', role: 'viewer' },
        { secret: 'change-me-in-production', expiresIn: '15d' },
      );
    });
  });
});
