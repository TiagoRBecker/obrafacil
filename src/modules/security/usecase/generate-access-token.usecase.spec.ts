import { JwtService } from '@nestjs/jwt';
import { GenerateAccessTokenUseCase } from './generate-access-token.usecase';

describe('GenerateAccessTokenUseCase', () => {
  let usecase: GenerateAccessTokenUseCase;
  let jwtService: { sign: jest.Mock };

  beforeEach(() => {
    jwtService = { sign: jest.fn() };
    usecase = new GenerateAccessTokenUseCase(jwtService as unknown as JwtService);
  });

  describe('execute', () => {
    it('have to emit access token with full payload', () => {
      jwtService.sign.mockReturnValue('token-acess');

      const result = usecase.execute({
        id: 'user-1',
        name: 'João',
        role: 'admin',
        permission: ['order:create'],
        settingsId: 'settings-1',
      });

      expect(jwtService.sign).toHaveBeenCalledWith({
        id: 'user-1',
        name: 'João',
        role: 'admin',
        permission: ['order:create'],
        settingsId: 'settings-1',
      });
      expect(result.accessToken).toBe('token-acess');
    });

    it('have to emit access token without optional fields', () => {
      jwtService.sign.mockReturnValue('token-acess');

      const result = usecase.execute({
        id: 'user-2',
        name: 'Maria',
        role: 'member',
      });

      expect(jwtService.sign).toHaveBeenCalledWith({
        id: 'user-2',
        name: 'Maria',
        role: 'member',
        permission: undefined,
        settingsId: undefined,
      });
      expect(result.accessToken).toBe('token-acess');
    });
  });
});
