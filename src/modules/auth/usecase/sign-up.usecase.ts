import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { AuthResponseDto } from '../dto/auth-response.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryInterface } from '../repo/user.repository.interface';
import { GenerateHashUseCase } from '../../security/usecase/generate-hash.usecase';

@Injectable()
export class SignUpUseCase {
  private readonly logger = new Logger(SignUpUseCase.name);

  constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly generateHashUseCase: GenerateHashUseCase,
  ) {}

  async execute(input: SignUpDto): Promise<AuthResponseDto> {
    this.logger.log(`Iniciando cadastro de novo usuário - email: ${input.email}`);
    
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser?.email) {
      this.logger.error(`Email já cadastrado no sistema: ${input.email}`);
      throw new BadRequestException('Email is already in use.');
    }

    this.logger.log(`Gerando hash da senha para: ${input.email}`);
    const passwordHash = await this.generateHashUseCase.execute({
      value: input.password,
    });

    const user = UserEntity.create({
      name: input.name,
      email: input.email,
      role: input.role,
      passwordHash,
      
    });

    const createdUser = await this.userRepository.create(user);
    this.logger.log(`Usuário cadastrado com sucesso - email: ${createdUser.email}, id: ${createdUser.id}`);

    return {
      user: {
        id: createdUser.id as string,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        permission:createdUser.permission,
        seettingsId:createdUser.settingsId
      
      },
    };
  }
}
