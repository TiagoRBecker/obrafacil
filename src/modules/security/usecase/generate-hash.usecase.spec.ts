import * as bcrypt from 'bcrypt';
import { GenerateHashUseCase } from './generate-hash.usecase';

jest.mock('bcrypt');

describe('GenerateHashUseCase', () => {
  let usecase: GenerateHashUseCase;

  beforeEach(() => {
    usecase = new GenerateHashUseCase();
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('have to hash value with default 10 salt rounds', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-value');

      const result = await usecase.execute({ value: 'senha123' });

      expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 10);
      expect(result).toBe('hashed-value');
    });

    it('have to hash value with provided salt rounds', async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-value');

      await usecase.execute({ value: 'senha123', saltRounds: 12 });

      expect(bcrypt.hash).toHaveBeenCalledWith('senha123', 12);
    });
  });
});
