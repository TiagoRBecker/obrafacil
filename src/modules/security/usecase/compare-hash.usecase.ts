import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CompareHashDto } from '../dto/compare-hash.dto';
import { CompareHashResponseDto } from '../dto/compare-hash-response.dto';

@Injectable()
export class CompareHashUseCase {
  async execute(input: CompareHashDto): Promise<CompareHashResponseDto> {
    const matches = await bcrypt.compare(input.value, input.hash);

    return {
      matches,
    };
  }
}
