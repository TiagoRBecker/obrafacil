import * as bcrypt from 'bcrypt';
import { CompareHashUseCase } from './compare-hash.usecase';

jest.mock('bcrypt');

describe('CompareHashUseCase', () => {
  let usecase: CompareHashUseCase;

  beforeEach(() => {
    usecase = new CompareHashUseCase();
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('have to return matches true when hashes match', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await usecase.execute({
        value: 'senha123',
        hash: 'hashed-value',
      });

      expect(bcrypt.compare).toHaveBeenCalledWith('senha123', 'hashed-value');
      expect(result.matches).toBe(true);
    });

    it('have to return matches false when hashes do not match', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await usecase.execute({
        value: 'senha-errada',
        hash: 'hashed-value',
      });

      expect(result.matches).toBe(false);
    });
  });
});
