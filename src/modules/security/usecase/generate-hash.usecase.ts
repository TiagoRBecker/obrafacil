import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { GenerateHashDto } from '../dto/generate-hash.dto';

@Injectable()
export class GenerateHashUseCase {
  async execute(input: GenerateHashDto): Promise<string> {
    const saltRounds = input.saltRounds ?? 10;
    return bcrypt.hash(input.value, saltRounds);
  }
}
